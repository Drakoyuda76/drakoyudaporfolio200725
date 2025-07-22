-- Create solution-images storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('solution-images', 'solution-images', true);

-- Create storage policy for solution images bucket
CREATE POLICY "Allow public access to solution images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'solution-images');

CREATE POLICY "Allow authenticated upload to solution images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'solution-images');

CREATE POLICY "Allow authenticated update to solution images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'solution-images');

CREATE POLICY "Allow authenticated delete from solution images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'solution-images');