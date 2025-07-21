import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'crimson';
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ 
  onClick, 
  children, 
  className = "",
  variant = 'primary'
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'secondary':
        return 'from-earth-500 to-earth-600 hover:from-earth-600 hover:to-earth-700';
      case 'crimson':
        return 'from-crimson-500 to-crimson-600 hover:from-crimson-600 hover:to-crimson-700';
      default:
        return 'from-forest-500 to-forest-700 hover:from-forest-600 hover:to-forest-800';
    }
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        `fixed bottom-6 right-6 z-50
         w-14 h-14 rounded-full shadow-2xl
         bg-gradient-to-br text-white
         transform hover:scale-110 hover:rotate-3
         transition-all duration-300 ease-out
         active:scale-95
         group`,
        getVariantClasses(),
        className
      )}
      style={{
        boxShadow: `
          0 10px 25px rgba(74, 157, 74, 0.3),
          inset 0 1px 2px rgba(255, 255, 255, 0.2),
          inset 0 -1px 2px rgba(0, 0, 0, 0.1)
        `
      }}
    >
      <div className="relative flex items-center justify-center w-full h-full">
        {children}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </button>
  );
};

export default FloatingActionButton;