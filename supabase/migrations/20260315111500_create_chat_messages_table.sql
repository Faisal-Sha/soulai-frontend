-- Create chat messages table to store chatbot conversations
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    birth_date TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id and birth_date for faster history retrieval
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_birth ON public.chat_messages(user_id, birth_date);

-- Enable Row Level Security
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own chat messages
CREATE POLICY "Users can view own chat messages"
    ON public.chat_messages
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy: Users can insert their own chat messages
-- Note: The Edge Function using admin client can also insert
CREATE POLICY "Users can insert own chat messages"
    ON public.chat_messages
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);
