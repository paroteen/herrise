-- Add is_featured column to impact_stories table for admin-defined featured stories

ALTER TABLE public.impact_stories 
ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;

-- Create index for efficient filtering by featured status
CREATE INDEX idx_impact_stories_is_featured ON public.impact_stories(is_featured);

-- Add comment
COMMENT ON COLUMN public.impact_stories.is_featured IS 'Whether this story is featured (appears at top of gallery with special styling)';
