import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  description: string;
  gradient?: string;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  icon: Icon, 
  value, 
  label, 
  description, 
  gradient = 'bg-gradient-to-r from-forest-500 to-forest-600',
  className = ""
}) => {
  return (
    <div className={cn("group relative", className)}>
      {/* 3D base layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800 rounded-2xl transform rotate-1 scale-105 opacity-30 group-hover:rotate-2 group-hover:scale-110 transition-all duration-500" />
      
      {/* Main card */}
      <div className="relative bg-white dark:bg-stone-800 rounded-2xl p-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2">
        {/* Gradient accent bar */}
        <div className={cn("h-1 w-16 rounded-full mb-6", gradient)} />
        
        {/* Icon with glow effect */}
        <div className="mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-700 dark:to-stone-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-6 h-6 text-forest-600 dark:text-forest-400" />
          </div>
        </div>
        
        {/* Content */}
        <div className="space-y-2">
          <div className="text-3xl font-bold text-stone-800 dark:text-stone-100 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors duration-300">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          <h3 className="font-semibold text-stone-700 dark:text-stone-300">
            {label}
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {description}
          </p>
        </div>
        
        {/* Subtle shine effect */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-br from-white/40 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

export default MetricCard;