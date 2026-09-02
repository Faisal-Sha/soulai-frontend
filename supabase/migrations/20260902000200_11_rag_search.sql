-- =============================================================================
-- V2 / 11 RAG search RPCs
-- documents / document_chunks / energy_summaries already exist on V2
-- (data copied from soul-ai-dev). This migration is idempotent for a new
-- project too: it creates the tables if missing, then the search RPCs.
-- Depends on: 10 agent_helpers (vector)
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  content_type text NOT NULL DEFAULT 'application/pdf'::text,
  file_size integer,
  total_chunks integer DEFAULT 0,
  language text DEFAULT 'en'::text,
  metadata jsonb DEFAULT '{}'::jsonb,
  uploaded_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  source_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.document_chunks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  document_id uuid NOT NULL REFERENCES public.documents(id) ON DELETE CASCADE,
  chunk_index integer NOT NULL,
  content text NOT NULL,
  embedding extensions.vector(1536),
  token_count integer,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  summary text
);

CREATE TABLE IF NOT EXISTS public.energy_summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  energy_number integer NOT NULL,
  position_type text NOT NULL,
  summary_text text NOT NULL,
  word_count integer,
  prompt_version_id uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT energy_summaries_energy_number_check
    CHECK ((energy_number >= 1) AND (energy_number <= 22)),
  CONSTRAINT energy_summaries_energy_number_position_type_key
    UNIQUE (energy_number, position_type)
);

CREATE INDEX IF NOT EXISTS idx_documents_language
  ON public.documents (language);

CREATE INDEX IF NOT EXISTS idx_document_chunks_document_id
  ON public.document_chunks (document_id);

DO $$
BEGIN
  PERFORM set_config('search_path', 'public, extensions', true);
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname = 'public' AND indexname = 'idx_document_chunks_embedding'
  ) THEN
    CREATE INDEX idx_document_chunks_embedding
      ON public.document_chunks
      USING hnsw (embedding vector_cosine_ops);
  END IF;
END $$;

COMMENT ON TABLE public.documents IS
  'Knowledge base documents for Soul-AI RAG pipeline';
COMMENT ON TABLE public.document_chunks IS
  'Text chunks with vector embeddings for semantic search';

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.document_chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.energy_summaries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow read documents" ON public.documents;
CREATE POLICY "Allow read documents"
  ON public.documents FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow read document_chunks" ON public.document_chunks;
CREATE POLICY "Allow read document_chunks"
  ON public.document_chunks FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Allow read energy_summaries" ON public.energy_summaries;
CREATE POLICY "Allow read energy_summaries"
  ON public.energy_summaries FOR SELECT
  TO anon, authenticated
  USING (true);

GRANT SELECT ON public.documents TO anon, authenticated;
GRANT SELECT ON public.document_chunks TO anon, authenticated;
GRANT SELECT ON public.energy_summaries TO anon, authenticated;
GRANT ALL ON public.documents TO service_role;
GRANT ALL ON public.document_chunks TO service_role;
GRANT ALL ON public.energy_summaries TO service_role;

DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname = 'match_document_chunks'
  LOOP
    EXECUTE 'DROP FUNCTION IF EXISTS ' || r.sig || ' CASCADE';
  END LOOP;
END $$;

CREATE OR REPLACE FUNCTION public.match_document_chunks(
  query_embedding extensions.vector(1536),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 8,
  p_language text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  document_id uuid,
  chunk_index int,
  content text,
  summary text,
  metadata jsonb,
  token_count int,
  filename text,
  language text,
  similarity float
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, extensions
AS $$
  SELECT
    dc.id,
    dc.document_id,
    dc.chunk_index,
    dc.content,
    dc.summary,
    dc.metadata,
    dc.token_count,
    d.filename,
    d.language,
    (1 - (dc.embedding <=> query_embedding))::float AS similarity
  FROM public.document_chunks dc
  LEFT JOIN public.documents d ON d.id = dc.document_id
  WHERE dc.embedding IS NOT NULL
    AND 1 - (dc.embedding <=> query_embedding) > match_threshold
    AND (
      p_language IS NULL
      OR NULLIF(trim(p_language), '') IS NULL
      OR lower(COALESCE(d.language, '')) = lower(trim(p_language))
    )
  ORDER BY dc.embedding <=> query_embedding
  LIMIT LEAST(GREATEST(COALESCE(match_count, 8), 1), 20);
$$;

GRANT EXECUTE ON FUNCTION public.match_document_chunks(extensions.vector, float, int, text)
  TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.get_energy_summaries(
  p_energy_number integer,
  p_position_type text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  energy_number integer,
  position_type text,
  summary_text text,
  word_count integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    es.id,
    es.energy_number,
    es.position_type,
    es.summary_text,
    es.word_count
  FROM public.energy_summaries es
  WHERE es.energy_number = p_energy_number
    AND (
      p_position_type IS NULL
      OR NULLIF(trim(p_position_type), '') IS NULL
      OR lower(es.position_type) = lower(trim(p_position_type))
    )
  ORDER BY es.position_type;
$$;

GRANT EXECUTE ON FUNCTION public.get_energy_summaries(integer, text)
  TO anon, authenticated, service_role;
