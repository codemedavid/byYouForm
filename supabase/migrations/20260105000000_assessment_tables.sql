-- Peptide Compatibility Assessment Tables
-- Created: 2026-01-05

-- Create assessment_responses table
CREATE TABLE IF NOT EXISTS public.assessment_responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    age_range TEXT,
    location TEXT,
    goals TEXT[] DEFAULT '{}',
    medical_history TEXT[] DEFAULT '{}',
    experience_level TEXT,
    preferences JSONB DEFAULT '{}'::jsonb,
    consent_agreed BOOLEAN DEFAULT false,
    recommendation_generated JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT CHECK (status IN ('new', 'reviewed', 'contacted')) DEFAULT 'new'
);

-- Create recommendation_rules table
CREATE TABLE IF NOT EXISTS public.recommendation_rules (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    rule_name TEXT NOT NULL,
    target_goal TEXT,
    target_experience TEXT,
    primary_product_id TEXT,
    secondary_product_ids TEXT[] DEFAULT '{}',
    educational_note TEXT,
    priority INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Disable RLS for easy access
ALTER TABLE public.assessment_responses DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendation_rules DISABLE ROW LEVEL SECURITY;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_assessment_responses_email ON public.assessment_responses(email);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_status ON public.assessment_responses(status);
CREATE INDEX IF NOT EXISTS idx_assessment_responses_created_at ON public.assessment_responses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_recommendation_rules_active ON public.recommendation_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_recommendation_rules_priority ON public.recommendation_rules(priority DESC);

-- Grant permissions
GRANT ALL ON public.assessment_responses TO anon, authenticated;
GRANT ALL ON public.recommendation_rules TO anon, authenticated;
