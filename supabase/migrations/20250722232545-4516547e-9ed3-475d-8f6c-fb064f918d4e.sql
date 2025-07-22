-- Create storage bucket for solution images
INSERT INTO storage.buckets (id, name, public) VALUES ('solution-images', 'solution-images', true);

-- Create policies for solution images storage bucket
-- Allow anyone to view images (public bucket)
CREATE POLICY "Solution images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'solution-images');

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload solution images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'solution-images');

-- Allow authenticated users to update images
CREATE POLICY "Users can update solution images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'solution-images');

-- Allow authenticated users to delete images
CREATE POLICY "Users can delete solution images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'solution-images');