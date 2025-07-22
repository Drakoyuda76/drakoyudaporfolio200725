import { supabase } from '@/integrations/supabase/client';

export const uploadSolutionImage = async (file: File): Promise<string | null> => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `solution-images/${fileName}`;

    const { data, error } = await supabase.storage
      .from('solution-images')
      .upload(filePath, file);

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('solution-images')
      .getPublicUrl(data.path);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    return null;
  }
};

export const deleteSolutionImage = async (imageUrl: string): Promise<boolean> => {
  try {
    // Extract the file path from the URL
    const url = new URL(imageUrl);
    const pathParts = url.pathname.split('/');
    const filePath = pathParts.slice(-2).join('/'); // Get 'solution-images/filename'

    const { error } = await supabase.storage
      .from('solution-images')
      .remove([filePath]);

    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};