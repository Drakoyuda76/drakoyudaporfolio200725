import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getStatusLabel, getStatusColor } from '@/data/solutions';
import type { Solution } from '@/types/solution';

interface SolutionCardProps {
  solution: Solution;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, index }) => {
  // Generate solution logo initials
  const getInitials = (title: string) => {
    return title
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Get primary color based on solution status
  const getPrimaryColor = (status: string) => {
    const colors = {
      'teste-convite': '#3B82F6',
      'prototipo': '#8B5CF6', 
      'parceria': '#4A9D4A',
      'live': '#059669',
      'conceito': '#78716C',
      'teste-usuarios': '#F59E0B',
    };
    return colors[status as keyof typeof colors] || '#4A9D4A';
  };

  const getSecondaryColor = (status: string) => {
    const colors = {
      'teste-convite': '#1D4ED8',
      'prototipo': '#7C3AED',
      'parceria': '#327332',
      'live': '#047857',
      'conceito': '#57534E',
      'teste-usuarios': '#D97706',
    };
    return colors[status as keyof typeof colors] || '#327332';
  };

  const primaryColor = getPrimaryColor(solution.status);
  const secondaryColor = getSecondaryColor(solution.status);

  return (
    <div 
      className="group relative bg-white dark:bg-stone-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] overflow-hidden animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* 3D Depth Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-50/50 to-stone-100/50 dark:from-stone-800/50 dark:to-stone-900/50 opacity-50" />
      
      {/* Logo Section - App Store Inspired */}
      <div className="relative p-6 border-b border-stone-200/50 dark:border-stone-700/50">
        <div className="flex items-center space-x-4">
          {/* Solution Logo Placeholder */}
          <div className="relative w-16 h-16 rounded-2xl shadow-lg overflow-hidden flex-shrink-0">
            <div 
              className="w-full h-full flex items-center justify-center text-white font-bold text-xl"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
              }}
            >
              <span className="drop-shadow-lg">
                {getInitials(solution.title)}
              </span>
            </div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform rotate-12 translate-x-8 group-hover:translate-x-16 transition-transform duration-700" />
          </div>
          
          {/* Solution Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-stone-900 dark:text-stone-100 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors truncate">
              {solution.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 font-medium line-clamp-2">
              {solution.subtitle}
            </p>
            
            {/* Status Badge with enhanced styling */}
            <div className="mt-2">
              <Badge variant={getStatusColor(solution.status) as any}>
                {getStatusLabel(solution.status)}
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content with 3D layering */}
      <div className="relative p-6">
        <p className="text-stone-700 dark:text-stone-300 text-sm line-clamp-3 leading-relaxed mb-4">
          {solution.description}
        </p>
        
        {/* SDG Goals Section */}
        {solution.sdgGoals && solution.sdgGoals.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-forest-600 dark:text-forest-400" />
              <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
                ODS Alinhados
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {solution.sdgGoals.map(sdg => (
                <div
                  key={sdg}
                  className="w-6 h-6 rounded bg-gradient-to-br from-forest-500 to-forest-600 text-white text-xs font-bold flex items-center justify-center shadow-sm"
                  title={`ODS ${sdg}`}
                >
                  {sdg}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Metrics with enhanced visual hierarchy */}
        <div className="flex items-center justify-between text-sm text-stone-600 dark:text-stone-400 mb-6">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{solution.timesSaved.toLocaleString()}h poupadas</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{solution.usersImpacted} utilizadores</span>
          </div>
        </div>
        
        {/* Enhanced CTA Button */}
        <Link 
          to={`/solucoes/${solution.id}`}
          className="group/btn inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          <span>Saber Mais</span>
          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
      
      {/* Premium glass morphism overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none backdrop-blur-sm" />
    </div>
  );
};

export default SolutionCard;