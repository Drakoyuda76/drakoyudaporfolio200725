
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getStatusLabel, getStatusColor } from '@/data/solutions';
import { supabase } from '@/integrations/supabase/client';
import type { Solution } from '@/types/solution';

interface SolutionCardProps {
  solution: Solution;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ solution, index }) => {
  const [iconUrl, setIconUrl] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSolutionAssets();
  }, [solution.id]);

  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 3000); // Change image every 3 seconds
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const loadSolutionAssets = async () => {
    try {
      setLoading(true);
      
      // Load icon from solution data (assuming we have iconUrl in solution)
      if ((solution as any).icon_url) {
        setIconUrl((solution as any).icon_url);
      }
      
      // Load demonstration images from solucao_imagens table
      const { data: imagesData, error } = await supabase
        .from('solucao_imagens')
        .select('imagem_url')
        .eq('solucao_id', solution.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading solution images:', error);
      } else if (imagesData && imagesData.length > 0) {
        setImages(imagesData.map(img => img.imagem_url));
      }
    } catch (error) {
      console.error('Error loading solution assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get status-based gradient for visual consistency
  const getCardGradient = (status: string) => {
    const statusGradients = {
      'teste-convite': 'from-blue-500 to-blue-600',
      'prototipo': 'from-purple-500 to-purple-600', 
      'parceria': 'from-green-500 to-green-600',
      'teste-usuarios': 'from-orange-500 to-orange-600',
      'conceito': 'from-gray-500 to-gray-600',
      'live': 'from-teal-500 to-teal-600'
    };
    return statusGradients[status as keyof typeof statusGradients] || 'from-gray-500 to-gray-600';
  };

  // Generate meaningful icon from solution name
  const getSolutionIcon = (title: string) => {
    const iconMap: { [key: string]: string } = {
      'Ana Lista': '📊',
      'BotBwala': '💬', 
      'KendaNet': '🚗',
      'HubDoSaberFazer': '🎓',
      'Angola Finanças': '💰',
      'Sr. Junior': '🤖',
      'Gestão de Contratos': '📄',
      'Document Generator': '📝',
      'AI Assistants Service': '🎯',
      'Agent Service': '⚡'
    };
    return iconMap[title] || '🔧';
  };

  return (
    <div 
      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Enhanced Header with Icon */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          {/* Solution Icon/Logo */}
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getCardGradient(solution.status)} flex items-center justify-center shadow-lg overflow-hidden`}>
            {iconUrl ? (
              <img src={iconUrl} alt={solution.title} className="w-full h-full object-cover" />
            ) : (
              <span className="text-white text-xl">
                {getSolutionIcon(solution.title)}
              </span>
            )}
          </div>
          
          {/* Solution Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {solution.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {solution.subtitle}
            </p>
          </div>
          
          {/* Status Badge */}
          <Badge variant={getStatusColor(solution.status) as any}>
            {getStatusLabel(solution.status)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-4 leading-relaxed">
          {solution.description}
        </p>
        
        {/* SDG Goals Section */}
        {solution.sdgGoals && solution.sdgGoals.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                ODS Alinhados
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {solution.sdgGoals.map(sdg => (
                <div
                  key={sdg}
                  className="w-6 h-6 rounded bg-gradient-to-br from-teal-500 to-teal-600 text-white text-xs font-bold flex items-center justify-center shadow-sm"
                  title={`ODS ${sdg}`}
                >
                  {sdg}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Metrics */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{solution.timesSaved.toLocaleString()}h poupadas</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{solution.usersImpacted} utilizadores</span>
          </div>
        </div>
        
        {/* Enhanced CTA Button */}
        <Link 
          to={`/solucoes/${solution.id}`}
          className="group/btn w-full bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 hover:shadow-lg transform hover:scale-105"
        >
          <span>Saber Mais</span>
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default SolutionCard;
