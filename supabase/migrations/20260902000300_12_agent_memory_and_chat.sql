-- =============================================================================
-- V2 / 12 agent memory + chat + conversation context
-- Agent Python still sends auth.users.id as p_user_id.
-- Rows hang off soul_profiles (owner_profile_id ON DELETE CASCADE).
-- Depends on: 02 soul_profiles, 10 agent_helpers
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_profile_id uuid NOT NULL
    REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  category text NOT NULL,
  memory_key text NOT NULL,
  memory_value text NOT NULL,
  memory_text text NOT NULL,
  importance integer NOT NULL DEFAULT 3,
  embedding extensions.vector(1536),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS memories_owner_profile_id_memory_key_uidx
  ON public.memories (owner_profile_id, memory_key);

DROP TRIGGER IF EXISTS memories_set_updated_at ON public.memories;
CREATE TRIGGER memories_set_updated_at
  BEFORE UPDATE ON public.memories
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS memories_select_own ON public.memories;
CREATE POLICY memories_select_own
  ON public.memories FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.memories FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.memories TO authenticated;
GRANT ALL ON public.memories TO service_role;

CREATE OR REPLACE FUNCTION public.save_memory(
  p_user_id uuid,
  p_category text,
  p_memory_key text,
  p_memory_value text,
  p_memory_text text,
  p_importance integer DEFAULT 3,
  p_embedding extensions.vector(1536) DEFAULT NULL
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
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  INSERT INTO public.memories (
    owner_profile_id, category, memory_key, memory_value,
    memory_text, importance, embedding, updated_at
  )
  VALUES (
    v_profile_id, p_category, p_memory_key, p_memory_value,
    p_memory_text, p_importance, p_embedding, now()
  )
  ON CONFLICT (owner_profile_id, memory_key)
  DO UPDATE SET
    category = EXCLUDED.category,
    memory_value = EXCLUDED.memory_value,
    memory_text = EXCLUDED.memory_text,
    importance = EXCLUDED.importance,
    embedding = COALESCE(EXCLUDED.embedding, public.memories.embedding),
    updated_at = now();
END;
$$;

GRANT EXECUTE ON FUNCTION public.save_memory(uuid, text, text, text, text, integer, extensions.vector)
  TO anon, authenticated, service_role;

DO $$
DECLARE
  r record;
BEGIN
  FOR r IN
    SELECT p.oid::regprocedure AS sig
    FROM pg_proc p
    JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname = 'search_memories'
  LOOP
    EXECUTE 'DROP FUNCTION IF EXISTS ' || r.sig || ' CASCADE';
  END LOOP;
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
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RETURN;
  END IF;

  IF p_query_embedding IS NOT NULL THEN
    RETURN QUERY
    SELECT
      m.category, m.memory_key, m.memory_value, m.memory_text, m.importance,
      (1 - (m.embedding <=> p_query_embedding))::float AS similarity
    FROM public.memories m
    WHERE m.owner_profile_id = v_profile_id
      AND m.embedding IS NOT NULL
      AND 1 - (m.embedding <=> p_query_embedding) > p_match_threshold
    ORDER BY m.embedding <=> p_query_embedding
    LIMIT v_limit;
    IF FOUND THEN
      RETURN;
    END IF;
  END IF;

  IF v_query IS NOT NULL THEN
    RETURN QUERY
    SELECT
      m.category, m.memory_key, m.memory_value, m.memory_text, m.importance,
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
    IF FOUND THEN
      RETURN;
    END IF;
  END IF;

  RETURN QUERY
  SELECT
    m.category, m.memory_key, m.memory_value, m.memory_text, m.importance,
    NULL::float AS similarity
  FROM public.memories m
  WHERE m.owner_profile_id = v_profile_id
  ORDER BY m.importance DESC, m.updated_at DESC
  LIMIT v_limit;
END;
$$;

GRANT EXECUTE ON FUNCTION public.search_memories(uuid, text, extensions.vector, integer, float)
  TO anon, authenticated, service_role;

CREATE OR REPLACE FUNCTION public.list_memories_missing_embeddings(
  p_limit integer DEFAULT 50
)
RETURNS TABLE (id uuid, memory_text text)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT m.id, m.memory_text
  FROM public.memories m
  WHERE m.embedding IS NULL
    AND NULLIF(trim(m.memory_text), '') IS NOT NULL
  ORDER BY m.created_at ASC
  LIMIT LEAST(GREATEST(COALESCE(p_limit, 50), 1), 200);
$$;

CREATE OR REPLACE FUNCTION public.set_memory_embedding(
  p_id uuid,
  p_embedding extensions.vector(1536)
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.memories
  SET embedding = p_embedding, updated_at = now()
  WHERE id = p_id;
$$;

GRANT EXECUTE ON FUNCTION public.list_memories_missing_embeddings(integer)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.set_memory_embedding(uuid, extensions.vector)
  TO anon, authenticated, service_role;

-- Chat history --------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.chat_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id text NOT NULL,
  owner_profile_id uuid NOT NULL
    REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_history_owner_thread_idx
  ON public.chat_history (owner_profile_id, thread_id, created_at);

ALTER TABLE public.chat_history ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS chat_history_select_own ON public.chat_history;
CREATE POLICY chat_history_select_own
  ON public.chat_history FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.chat_history FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.chat_history TO authenticated;
GRANT ALL ON public.chat_history TO service_role;

CREATE OR REPLACE FUNCTION public.save_chat_message(
  p_thread_id text,
  p_user_id uuid,
  p_role text,
  p_content text
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
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  INSERT INTO public.chat_history (thread_id, owner_profile_id, role, content)
  VALUES (p_thread_id, v_profile_id, p_role, p_content);
END;
$$;

CREATE OR REPLACE FUNCTION public.get_chat_history(
  p_thread_id text,
  p_user_id uuid
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
BEGIN
  v_profile_id := public.soul_profile_id_for_auth(p_user_id);
  IF v_profile_id IS NULL THEN
    RETURN;
  END IF;

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
  ORDER BY ch.created_at ASC;
END;
$$;

CREATE OR REPLACE FUNCTION public.list_chat_threads(p_user_id uuid)
RETURNS TABLE (
  thread_id text,
  preview text,
  message_count bigint,
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
    ch.thread_id,
    (
      SELECT c2.content
      FROM public.chat_history c2
      WHERE c2.thread_id = ch.thread_id
        AND c2.owner_profile_id = v_profile_id
        AND c2.role = 'user'
      ORDER BY c2.created_at ASC
      LIMIT 1
    ) AS preview,
    COUNT(*)::bigint AS message_count,
    MAX(ch.created_at) AS updated_at
  FROM public.chat_history ch
  WHERE ch.owner_profile_id = v_profile_id
  GROUP BY ch.thread_id
  ORDER BY MAX(ch.created_at) DESC;
END;
$$;

GRANT EXECUTE ON FUNCTION public.save_chat_message(text, uuid, text, text)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_chat_history(text, uuid)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.list_chat_threads(uuid)
  TO anon, authenticated, service_role;

-- Conversation context ------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.conversation_context (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id text NOT NULL,
  owner_profile_id uuid NOT NULL
    REFERENCES public.soul_profiles(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'waiting'
    CHECK (status IN ('waiting', 'ready', 'cleared')),
  intent text NOT NULL,
  slots jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (thread_id)
);

DROP TRIGGER IF EXISTS conversation_context_set_updated_at ON public.conversation_context;
CREATE TRIGGER conversation_context_set_updated_at
  BEFORE UPDATE ON public.conversation_context
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.conversation_context ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS conversation_context_select_own ON public.conversation_context;
CREATE POLICY conversation_context_select_own
  ON public.conversation_context FOR SELECT TO authenticated
  USING (public.owner_profile_matches(owner_profile_id));

REVOKE ALL ON public.conversation_context FROM PUBLIC, anon, authenticated;
GRANT SELECT ON public.conversation_context TO authenticated;
GRANT ALL ON public.conversation_context TO service_role;

CREATE OR REPLACE FUNCTION public.get_conversation_context(
  p_thread_id text,
  p_user_id uuid
)
RETURNS TABLE (
  id uuid,
  thread_id text,
  user_id uuid,
  status text,
  intent text,
  slots jsonb,
  created_at timestamptz,
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
    cc.id, cc.thread_id, p_user_id, cc.status, cc.intent,
    cc.slots, cc.created_at, cc.updated_at
  FROM public.conversation_context cc
  WHERE cc.thread_id = p_thread_id
    AND cc.owner_profile_id = v_profile_id
    AND cc.status IN ('waiting', 'ready')
  LIMIT 1;
END;
$$;

CREATE OR REPLACE FUNCTION public.upsert_conversation_context(
  p_thread_id text,
  p_user_id uuid,
  p_status text,
  p_intent text,
  p_slots jsonb
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
    RAISE EXCEPTION 'soul_profile not found for auth user %', p_user_id;
  END IF;

  INSERT INTO public.conversation_context (
    thread_id, owner_profile_id, status, intent, slots, updated_at
  )
  VALUES (
    p_thread_id, v_profile_id, p_status, p_intent,
    COALESCE(p_slots, '{}'::jsonb), now()
  )
  ON CONFLICT (thread_id)
  DO UPDATE SET
    owner_profile_id = EXCLUDED.owner_profile_id,
    status = EXCLUDED.status,
    intent = EXCLUDED.intent,
    slots = EXCLUDED.slots,
    updated_at = now();
END;
$$;

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

  DELETE FROM public.conversation_context
  WHERE thread_id = p_thread_id
    AND owner_profile_id = v_profile_id;
END;
$$;

CREATE OR REPLACE FUNCTION public.delete_chat_thread(
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

  DELETE FROM public.conversation_context
  WHERE thread_id = p_thread_id
    AND owner_profile_id = v_profile_id;

  DELETE FROM public.chat_history
  WHERE thread_id = p_thread_id
    AND owner_profile_id = v_profile_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_conversation_context(text, uuid)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.upsert_conversation_context(text, uuid, text, text, jsonb)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.clear_conversation_context(text, uuid)
  TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.delete_chat_thread(text, uuid)
  TO anon, authenticated, service_role;
