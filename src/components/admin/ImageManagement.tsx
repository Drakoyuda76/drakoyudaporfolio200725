import React, { useState } from 'react';
import { Trash2, Plus, Upload, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Solution } from '@/types/solution';
import { uploadSolutionImage, deleteSolutionImage } from '@/utils/supabaseStorage';

interface ImageManagementProps {
  solution: Solution;
  updateSolution: (solution: Solution) => void;
}

const ImageManagement: React.FC<ImageManagementProps> = ({ solution, updateSolution }) => {
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  const updateImageUrl = (imageIndex: number, newImageUrl: string) => {
    const updatedImages = [...(solution.images || [])];
    updatedImages[imageIndex] = { 
      ...updatedImages[imageIndex], 
      imageUrl: newImageUrl 
    };
    updateSolution({ ...solution, images: updatedImages });
  };

  const updateImageDescription = (imageIndex: number, newDescription: string) => {
    const updatedImages = [...(solution.images || [])];
    updatedImages[imageIndex] = { 
      ...updatedImages[imageIndex], 
      description: newDescription 
    };
    updateSolution({ ...solution, images: updatedImages });
  };

  const updateImageTitle = (imageIndex: number, newTitle: string) => {
    const updatedImages = [...(solution.images || [])];
    updatedImages[imageIndex] = { 
      ...updatedImages[imageIndex], 
      title: newTitle 
    };
    updateSolution({ ...solution, images: updatedImages });
  };

  const handleFileUpload = async (imageIndex: number, file: File) => {
    setUploadingIndex(imageIndex);
    
    try {
      const imageUrl = await uploadSolutionImage(file);
      if (imageUrl) {
        updateImageUrl(imageIndex, imageUrl);
      } else {
        alert('Erro ao fazer upload da imagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Erro ao fazer upload da imagem. Tente novamente.');
    } finally {
      setUploadingIndex(null);
    }
  };

  const addNewImage = () => {
    const currentImages = solution.images || [];
    const newImage = {
      id: Date.now().toString(),
      title: `Imagem ${currentImages.length + 1}`,
      description: 'Nova imagem da solução',
      imageUrl: ''
    };
    updateSolution({ 
      ...solution, 
      images: [...currentImages, newImage] 
    });
  };

  const removeImage = async (imageIndex: number) => {
    const image = solution.images?.[imageIndex];
    if (image?.imageUrl) {
      await deleteSolutionImage(image.imageUrl);
    }
    const updatedImages = (solution.images || []).filter((_, index) => index !== imageIndex);
    updateSolution({ ...solution, images: updatedImages });
  };

  const getInitials = (title: string) => {
    return title
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6 p-6 bg-stone-50 dark:bg-stone-800 rounded-lg">
      <h3 className="text-lg font-semibold text-foreground">Gestão de Imagens</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(solution.images || []).map((image, index) => (
          <div key={image.id || index} className="border border-border rounded-lg p-4 space-y-4 bg-background">
            {/* Image Preview */}
            <div className="w-full h-32 rounded-md flex items-center justify-center bg-muted overflow-hidden">
              {image.imageUrl ? (
                <img 
                  src={image.imageUrl} 
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-sm">Sem imagem</span>
                </div>
              )}
            </div>
            
            {/* Image Title */}
            <div>
              <Label htmlFor={`image-title-${index}`} className="block text-sm font-medium mb-2">
                Título da Imagem
              </Label>
              <Input
                id={`image-title-${index}`}
                type="text"
                value={image.title || ''}
                onChange={(e) => updateImageTitle(index, e.target.value)}
                placeholder="Título da imagem"
              />
            </div>
            
            {/* Image Description */}
            <div>
              <Label htmlFor={`image-description-${index}`} className="block text-sm font-medium mb-2">
                Descrição da Imagem
              </Label>
              <Input
                id={`image-description-${index}`}
                type="text"
                value={image.description || ''}
                onChange={(e) => updateImageDescription(index, e.target.value)}
                placeholder="Descrição da imagem"
              />
            </div>
            
            {/* File Upload */}
            <div>
              <Label htmlFor={`image-upload-${index}`} className="block text-sm font-medium mb-2">
                Upload de Imagem
              </Label>
              <Input
                id={`image-upload-${index}`}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleFileUpload(index, file);
                  }
                }}
                disabled={uploadingIndex === index}
                className="cursor-pointer"
              />
              {uploadingIndex === index && (
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                  Fazendo upload...
                </div>
              )}
            </div>
            
            {/* Remove Button */}
            <Button
              type="button"
              onClick={() => removeImage(index)}
              variant="destructive"
              size="sm"
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remover Imagem
            </Button>
          </div>
        ))}
      </div>
      
      {/* Add New Image Button */}
      <div className="flex justify-center">
        <Button
          type="button"
          onClick={addNewImage}
          variant="outline"
          className="bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Nova Imagem
        </Button>
      </div>
    </div>
  );
};

export default ImageManagement;