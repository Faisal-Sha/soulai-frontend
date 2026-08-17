-- Add session support to chat_messages table
ALTER TABLE public.chat_messages 
ADD COLUMN IF NOT EXISTS session_id UUID,
ADD COLUMN IF NOT EXISTS session_name TEXT;

-- Create an index on session_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON public.chat_messages(session_id);

-- Group existing messages by user_id and birth_date to create initial sessions
DO $$ 
DECLARE
    r RECORD;
    new_sess_id UUID;
BEGIN
    FOR r IN (SELECT DISTINCT user_id, birth_date FROM public.chat_messages WHERE session_id IS NULL) LOOP
        new_sess_id := gen_random_uuid();
        UPDATE public.chat_messages 
        SET session_id = new_sess_id, 
            session_name = 'Previous Chat'
        WHERE user_id = r.user_id 
          AND birth_date = r.birth_date 
          AND session_id IS NULL;
    END LOOP;
END $$;
