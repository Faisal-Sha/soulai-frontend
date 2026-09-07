-- =============================================================================
-- V2 / 14 context engineering
-- Bounded chat-history reads + rolling thread summaries.
-- Existing RPC behavior remains compatible: get_chat_history(..., ...)
-- still returns the full history when p_limit is omitted/NULL.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Chat history: database-level bounded window
-- -----------------------------------------------------------------------------
DROP FUNCTION IF EXISTS public.get_chat_history(text, uuid);

CREATE OR REPLACE FUNCTION public.get_chat_history(
  p_thread_id text,
  p_user_id uuid,
  p_limit integer DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  thread_id text,
  user_id uuid,
  role text,
  content text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
  v_limit integer;
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RETURN;
  END IF;

  -- NULL preserves the old full-history behavior for admin/export callers.
  IF p_limit IS NULL THEN
    RETURN QUERY
    SELECT
      ch.id,
      ch.thread_id,
      p_user_id AS user_id,
      ch.role,
      ch.content,
      ch.created_at
    FROM public.chat_history ch
    WHERE ch.thread_id = p_thread_id
      AND ch.owner_profile_id = v_profile_id
    ORDER BY ch.created_at ASC, ch.id ASC;
    RETURN;
  END IF;

  v_limit := LEAST(GREATEST(COALESCE(p_limit, 10), 1), 100);

  -- Fetch newest N using the owner/thread/created_at index, then restore
  -- chronological order for LangChain.
  RETURN QUERY
  SELECT q.id, q.thread_id, q.user_id, q.role, q.content, q.created_at
  FROM (
    SELECT
      ch.id,
      ch.thread_id,
      p_user_id AS user_id,
      ch.role,
      ch.content,
      ch.created_at
    FROM public.chat_history ch
    WHERE ch.thread_id = p_thread_id
      AND ch.owner_profile_id = v_profile_id
    ORDER BY ch.created_at DESC, ch.id DESC
    LIMIT v_limit
  ) q
  ORDER BY q.created_at ASC, q.id ASC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_chat_history(text, uuid, integer)
  TO anon, authenticated, service_role;


-- Fetch a bounded slice of older messages for rolling-summary maintenance.
CREATE OR REPLACE FUNCTION public.get_chat_history_before(
  p_thread_id text,
  p_user_id uuid,
  p_before_created_at timestamptz,
  p_after_created_at timestamptz DEFAULT NULL,
  p_limit integer DEFAULT 20
)
RETURNS TABLE (
  id uuid,
  thread_id text,
  user_id uuid,
  role text,
  content text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
  v_limit integer;
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL OR p_before_created_at IS NULL THEN
    RETURN;
  END IF;

  v_limit := LEAST(GREATEST(COALESCE(p_limit, 20), 1), 50);

  RETURN QUERY
  SELECT
    ch.id,
    ch.thread_id,
    p_user_id AS user_id,
    ch.role,
    ch.content,
    ch.created_at
  FROM public.chat_history ch
  WHERE ch.thread_id = p_thread_id
    AND ch.owner_profile_id = v_profile_id
    AND ch.created_at < p_before_created_at
    AND (
      p_after_created_at IS NULL
      OR ch.created_at > p_after_created_at
    )
  ORDER BY ch.created_at ASC, ch.id ASC
  LIMIT v_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_chat_history_before(text, uuid, timestamptz, timestamptz, integer)
  TO anon, authenticated, service_role;


-- -----------------------------------------------------------------------------
-- Rolling summary metadata lives beside conversation_context, but is logically
-- independent from the waiting/ready/cleared HIL state.
-- -----------------------------------------------------------------------------
ALTER TABLE public.conversation_context
  ADD COLUMN IF NOT EXISTS thread_summary text;

ALTER TABLE public.conversation_context
  ADD COLUMN IF NOT EXISTS summary_message_count integer NOT NULL DEFAULT 0;

ALTER TABLE public.conversation_context
  ADD COLUMN IF NOT EXISTS summary_through_created_at timestamptz;

COMMENT ON COLUMN public.conversation_context.thread_summary IS
  'Compact rolling summary of older chat history used for LLM context engineering.';
COMMENT ON COLUMN public.conversation_context.summary_message_count IS
  'Number of chat messages incorporated into thread_summary.';
COMMENT ON COLUMN public.conversation_context.summary_through_created_at IS
  'Cursor timestamp through which chat messages have been incorporated into thread_summary.';


CREATE OR REPLACE FUNCTION public.get_thread_summary(
  p_thread_id text,
  p_user_id uuid
)
RETURNS TABLE (
  thread_id text,
  thread_summary text,
  summary_message_count integer,
  summary_through_created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RETURN;
  END IF;

  RETURN QUERY
  SELECT
    cc.thread_id,
    cc.thread_summary,
    cc.summary_message_count,
    cc.summary_through_created_at,
    cc.updated_at
  FROM public.conversation_context cc
  WHERE cc.thread_id = p_thread_id
    AND cc.owner_profile_id = v_profile_id
  LIMIT 1;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_thread_summary(text, uuid)
  TO anon, authenticated, service_role;


CREATE OR REPLACE FUNCTION public.upsert_thread_summary(
  p_thread_id text,
  p_user_id uuid,
  p_thread_summary text,
  p_summary_message_count integer,
  p_summary_through_created_at timestamptz
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
  v_existing_owner uuid;
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  SELECT cc.owner_profile_id
  INTO v_existing_owner
  FROM public.conversation_context cc
  WHERE cc.thread_id = p_thread_id
  LIMIT 1;

  IF v_existing_owner IS NOT NULL AND v_existing_owner <> v_profile_id THEN
    RAISE EXCEPTION 'conversation thread is owned by another profile';
  END IF;

  INSERT INTO public.conversation_context (
    thread_id,
    owner_profile_id,
    status,
    intent,
    slots,
    thread_summary,
    summary_message_count,
    summary_through_created_at,
    updated_at
  )
  VALUES (
    p_thread_id,
    v_profile_id,
    'cleared',
    'context_summary',
    '{}'::jsonb,
    NULLIF(trim(COALESCE(p_thread_summary, '')), ''),
    GREATEST(COALESCE(p_summary_message_count, 0), 0),
    p_summary_through_created_at,
    now()
  )
  ON CONFLICT (thread_id)
  DO UPDATE SET
    thread_summary = EXCLUDED.thread_summary,
    summary_message_count = EXCLUDED.summary_message_count,
    summary_through_created_at = EXCLUDED.summary_through_created_at,
    updated_at = now();
END;
$$;

GRANT EXECUTE ON FUNCTION public.upsert_thread_summary(text, uuid, text, integer, timestamptz)
  TO anon, authenticated, service_role;


-- Preserve the rolling summary when a HIL task is cleared. The external
-- waiting/ready behavior is unchanged because get_conversation_context still
-- only returns rows whose status is waiting/ready.
CREATE OR REPLACE FUNCTION public.clear_conversation_context(
  p_thread_id text,
  p_user_id uuid
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_profile_id uuid;
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RETURN;
  END IF;

  UPDATE public.conversation_context
  SET
    status = 'cleared',
    intent = COALESCE(intent, 'context_summary'),
    slots = '{}'::jsonb,
    updated_at = now()
  WHERE thread_id = p_thread_id
    AND owner_profile_id = v_profile_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.clear_conversation_context(text, uuid)
  TO anon, authenticated, service_role;

-- -----------------------------------------------------------------------------
-- Memory retrieval: never turn a focused miss into an unrelated memory dump.
-- Keep the existing RPC signature and default threshold for compatibility.
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS memories_owner_importance_idx
  ON public.memories (owner_profile_id, importance DESC, updated_at DESC);

DO $$
BEGIN
  PERFORM set_config('search_path', 'public, extensions', true);
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE schemaname = 'public' AND indexname = 'memories_embedding_hnsw_idx'
  ) THEN
    CREATE INDEX memories_embedding_hnsw_idx
      ON public.memories
      USING hnsw (embedding vector_cosine_ops);
  END IF;
END $$;

CREATE OR REPLACE FUNCTION public.search_memories(
  p_user_id uuid,
  p_query text DEFAULT NULL,
  p_query_embedding extensions.vector(1536) DEFAULT NULL,
  p_limit integer DEFAULT 8,
  p_match_threshold float DEFAULT 0.25
)
RETURNS TABLE (
  category text,
  memory_key text,
  memory_value text,
  memory_text text,
  importance integer,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, extensions
AS $$
DECLARE
  v_profile_id uuid;
  v_limit integer := LEAST(GREATEST(COALESCE(p_limit, 8), 1), 20);
  v_query text := NULLIF(trim(COALESCE(p_query, '')), '');
  v_threshold float := LEAST(GREATEST(COALESCE(p_match_threshold, 0.25), 0), 1);
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RETURN;
  END IF;

  -- Semantic retrieval is the preferred path. A failed/empty semantic match
  -- may fall through to exact-ish keyword matching, but never to unrelated
  -- high-importance memories when a focused query was supplied.
  IF p_query_embedding IS NOT NULL THEN
    RETURN QUERY
    SELECT
      m.category,
      m.memory_key,
      m.memory_value,
      m.memory_text,
      m.importance,
      (1 - (m.embedding <=> p_query_embedding))::float AS similarity
    FROM public.memories m
    WHERE m.owner_profile_id = v_profile_id
      AND m.embedding IS NOT NULL
      AND 1 - (m.embedding <=> p_query_embedding) > v_threshold
    ORDER BY m.embedding <=> p_query_embedding
    LIMIT v_limit;

    IF FOUND THEN
      RETURN;
    END IF;
  END IF;

  IF v_query IS NOT NULL THEN
    RETURN QUERY
    SELECT
      m.category,
      m.memory_key,
      m.memory_value,
      m.memory_text,
      m.importance,
      NULL::float AS similarity
    FROM public.memories m
    WHERE m.owner_profile_id = v_profile_id
      AND (
        m.memory_text ILIKE '%' || v_query || '%'
        OR m.memory_key ILIKE '%' || v_query || '%'
        OR m.memory_value ILIKE '%' || v_query || '%'
      )
    ORDER BY m.importance DESC, m.updated_at DESC
    LIMIT v_limit;

    -- Focused query + no match = no context. Never pad the model prompt with
    -- unrelated memories merely because the requested fact was not found.
    RETURN;
  END IF;

  -- An empty query is an explicit request for a compact high-importance view.
  RETURN QUERY
  SELECT
    m.category,
    m.memory_key,
    m.memory_value,
    m.memory_text,
    m.importance,
    NULL::float AS similarity
  FROM public.memories m
  WHERE m.owner_profile_id = v_profile_id
  ORDER BY m.importance DESC, m.updated_at DESC
  LIMIT v_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_memories(uuid, text, extensions.vector, integer, float)
  TO anon, authenticated, service_role;
