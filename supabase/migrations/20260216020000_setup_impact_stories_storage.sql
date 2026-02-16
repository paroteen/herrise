-- Create storage bucket for impact stories images
INSERT INTO storage.buckets (id, name, public)
VALUES ('impact-stories', 'impact-stories', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload impact story images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'impact-stories');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update impact story images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'impact-stories');

-- Allow authenticated users to delete images
CREATE POLICY "Authenticated users can delete impact story images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'impact-stories');

-- Allow public read access to all images
CREATE POLICY "Public can view impact story images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'impact-stories');
