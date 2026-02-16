-- Add is_featured column to she_stories table for admin-defined featured stories

ALTER TABLE public.she_stories 
ADD COLUMN is_featured BOOLEAN DEFAULT FALSE;

-- Create index for efficient filtering by featured status
CREATE INDEX idx_she_stories_is_featured ON public.she_stories(is_featured);

-- Add comment
COMMENT ON COLUMN public.she_stories.is_featured IS 'Whether this story is featured (appears at top of gallery with larger card)';
