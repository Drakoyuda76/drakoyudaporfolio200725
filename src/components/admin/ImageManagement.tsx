import React from 'react';
import { Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Solution } from '@/types/solution';

interface ImageManagementProps {
  solution: Solution;
  updateSolution: (solution: Solution) => void;
}

const ImageManagement: React.FC<ImageManagementProps> = ({ solution, updateSolution }) => {
  const updateImageColorScheme = (imageIndex: number, newColorScheme: string) => {
    const updatedImages = [...(solution.images || [])];
    updatedImages[imageIndex] = { 
      ...updatedImages[imageIndex], 
      colorScheme: newColorScheme 
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

  const addNewImage = () => {
    const currentImages = solution.images || [];
    const newImage = {
      id: Date.now().toString(),
      title: `Imagem ${currentImages.length + 1}`,
      description: 'Nova imagem da solução',
      colorScheme: '#6B7280'
    };
    updateSolution({ 
      ...solution, 
      images: [...currentImages, newImage] 
    });
  };

  const removeImage = (imageIndex: number) => {
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
            <div 
              className="w-full h-32 rounded-md flex items-center justify-center text-white font-bold text-xl shadow-inner"
              style={{ backgroundColor: image.colorScheme || '#6B7280' }}
            >
              {getInitials(solution.title)}
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
            
            {/* Color Picker */}
            <div>
              <Label htmlFor={`image-color-${index}`} className="block text-sm font-medium mb-2">
                Cor de Fundo
              </Label>
              <div className="flex items-center space-x-2">
                <Input
                  id={`image-color-${index}`}
                  type="color"
                  value={image.colorScheme || '#6B7280'}
                  onChange={(e) => updateImageColorScheme(index, e.target.value)}
                  className="w-16 h-10 p-1 border rounded-md cursor-pointer"
                />
                <Input
                  type="text"
                  value={image.colorScheme || '#6B7280'}
                  onChange={(e) => updateImageColorScheme(index, e.target.value)}
                  placeholder="#6B7280"
                  className="flex-1"
                />
              </div>
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