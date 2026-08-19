-- Create ai_insights table
CREATE TABLE IF NOT EXISTS public.ai_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    matrix_id UUID,
    birth_date TEXT NOT NULL,
    matrix_data JSONB NOT NULL,
    insight_text TEXT NOT NULL,
    language TEXT NOT NULL DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_ai_insights_user_birth ON public.ai_insights(user_id, birth_date);
CREATE INDEX IF NOT EXISTS idx_ai_insights_matrix ON public.ai_insights(matrix_id);

-- Enable RLS
ALTER TABLE public.ai_insights ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can view their own insights
CREATE POLICY "Users can view their own insights"
ON public.ai_insights
FOR SELECT
USING (auth.uid() = user_id);

-- Users can insert their own insights
CREATE POLICY "Users can insert their own insights"
ON public.ai_insights
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can update their own insights
CREATE POLICY "Users can update their own insights"
ON public.ai_insights
FOR UPDATE
USING (auth.uid() = user_id);

-- Users can delete their own insights
CREATE POLICY "Users can delete their own insights"
ON public.ai_insights
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for automatic updated_at updates
CREATE TRIGGER update_ai_insights_updated_at
BEFORE UPDATE ON public.ai_insights
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();