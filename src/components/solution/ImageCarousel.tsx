import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { SolutionImage } from '@/types/solution';

interface ImageCarouselProps {
  images: string[];
  solutionTitle: string;
}

const ImageCarousel = ({ images, solutionTitle }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  const currentImage = images[currentIndex];

  if (!images || images.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">Sem imagens de demonstração</p>
        <p className="text-xs text-muted-foreground mt-2">
          As imagens de demonstração devem ser adicionadas pelo administrador
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Display */}
      <Card className="relative overflow-hidden border-border/40 bg-card/50">
        <CardContent className="p-0">
          <div className="relative h-80 overflow-hidden">
            {/* Actual Image Display */}
            <img 
              src={currentImage} 
              alt={`${solutionTitle} - Imagem ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white border-0"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {currentIndex + 1} de {images.length}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 relative ${
                index === currentIndex
                  ? 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                  : 'hover:ring-1 hover:ring-accent/50 hover:ring-offset-1 hover:ring-offset-background'
              } rounded-lg overflow-hidden transition-all duration-200`}
            >
              <div className="w-20 h-16 overflow-hidden rounded-lg">
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {index === currentIndex && (
                <div className="absolute inset-0 bg-accent/20 rounded-lg" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Details */}
      <div className="text-center space-y-2">
        <h4 className="font-medium text-foreground">{solutionTitle}</h4>
        <p className="text-sm text-muted-foreground">Imagem {currentIndex + 1} de {images.length}</p>
      </div>
    </div>
  );
};

export default ImageCarousel;