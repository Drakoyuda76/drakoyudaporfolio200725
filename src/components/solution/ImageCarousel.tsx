import { useState } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { SolutionImage } from '@/types/solution';

interface ImageCarouselProps {
  images: SolutionImage[];
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

  return (
    <div className="space-y-4">
      {/* Main Display */}
      <Card className="relative overflow-hidden border-border/40 bg-card/50">
        <CardContent className="p-0">
          <div className={`relative h-80 bg-gradient-to-br ${currentImage?.colorScheme || 'from-gray-600 to-gray-800'} flex items-center justify-center`}>
            {/* Placeholder Visual Content */}
            <div className="text-center space-y-4 p-8">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-xl flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-tomorrow font-semibold text-white">
                {currentImage?.title}
              </h3>
              <p className="text-white/80 text-sm max-w-xs">
                {currentImage?.description}
              </p>
            </div>

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
              key={image.id}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 relative ${
                index === currentIndex
                  ? 'ring-2 ring-accent ring-offset-2 ring-offset-background'
                  : 'hover:ring-1 hover:ring-accent/50 hover:ring-offset-1 hover:ring-offset-background'
              } rounded-lg overflow-hidden transition-all duration-200`}
            >
              <div className={`w-20 h-16 bg-gradient-to-br ${image.colorScheme} flex items-center justify-center`}>
                <div className="w-6 h-6 bg-white/30 rounded-md flex items-center justify-center">
                  <Play className="h-3 w-3 text-white" />
                </div>
              </div>
              {index === currentIndex && (
                <div className="absolute inset-0 bg-accent/20" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Image Details */}
      <div className="text-center space-y-2">
        <h4 className="font-medium text-foreground">{currentImage?.title}</h4>
        <p className="text-sm text-muted-foreground">{currentImage?.description}</p>
      </div>
    </div>
  );
};

export default ImageCarousel;