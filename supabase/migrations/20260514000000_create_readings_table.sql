-- Create readings table to store master reading JSON
CREATE TABLE IF NOT EXISTS public.readings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES public.quiz_leads(id) ON DELETE SET NULL,
    content JSONB NOT NULL,
    pdf_url TEXT,
    pdf_generated_at TIMESTAMP WITH TIME ZONE,
    status TEXT NOT NULL DEFAULT 'processing', -- 'processing', 'ready', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;

-- Policies
-- Users can view their own readings
CREATE POLICY "Users can view own readings"
    ON public.readings FOR SELECT
    USING (auth.uid() = user_id);

-- Service role can do everything (for background generation)
-- Note: Service role bypasses RLS, but we can be explicit if needed.
-- However, for the Edge Functions using service_role, they will have full access.

-- Indexes
CREATE INDEX IF NOT EXISTS idx_readings_user_id ON public.readings(user_id);
CREATE INDEX IF NOT EXISTS idx_readings_lead_id ON public.readings(lead_id);
CREATE INDEX IF NOT EXISTS idx_readings_status ON public.readings(status);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_readings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_readings_updated_at
    BEFORE UPDATE ON public.readings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_readings_updated_at();

-- Add helpful comments
COMMENT ON TABLE public.readings IS 'Master storage for generated readings (JSON structure). Used for web, PDF, and email.';
COMMENT ON COLUMN public.readings.content IS 'Structured JSON containing all reading sections.';
COMMENT ON COLUMN public.readings.status IS 'Current state of reading generation: processing, ready, or failed.';
