-- Add balance and free_messages_count to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS balance NUMERIC(10, 2) DEFAULT 0.00,
ADD COLUMN IF NOT EXISTS free_messages_count INTEGER DEFAULT 0;

-- Ensure numeric precision is respected (optional depends on Postgres version but standard for currency)
COMMENT ON COLUMN public.profiles.balance IS 'User current balance for chatbot messages';
COMMENT ON COLUMN public.profiles.free_messages_count IS 'Total number of free chatbot messages used by user';
