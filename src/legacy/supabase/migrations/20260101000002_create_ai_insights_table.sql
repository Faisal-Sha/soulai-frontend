-- Create AI insights table to store generated analyses
CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    matrix_id UUID REFERENCES public.saved_matrices(id) ON DELETE CASCADE,
    birth_date TEXT NOT NULL,
    matrix_data JSONB NOT NULL,
    insight_text TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on user_id and birth_date for faster lookups
CREATE INDEX IF NOT EXISTS idx_ai_insights_user_birth ON public.ai_insights(user_id, birth_date);

-- Create index on matrix_id
CREATE INDEX IF NOT EXISTS idx_ai_insights_matrix ON public.ai_insights(matrix_id);

-- Enable Row Level Security
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can view their own insights
CREATE POLICY "Users can view own insights"
    ON public.ai_insights
    FOR SELECT
    USING (auth.uid() = user_id);

-- Create policy: Users can insert their own insights
CREATE POLICY "Users can insert own insights"
    ON public.ai_insights
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own insights
CREATE POLICY "Users can update own insights"
    ON public.ai_insights
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Create policy: Users can delete their own insights
CREATE POLICY "Users can delete own insights"
    ON public.ai_insights
    FOR DELETE
    USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_ai_insights_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_insights_updated_at
    BEFORE UPDATE ON public.ai_insights
    FOR EACH ROW
    EXECUTE FUNCTION public.update_ai_insights_updated_at();
