
import React from 'react';
import { Edit, Trash2, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getStatusLabel, getStatusColor } from '@/data/solutions';
import type { Solution } from '@/types/solution';

interface SolutionRowItemProps {
  solution: Solution;
  onEdit: (solution: Solution) => void;
  onDelete: (id: string) => void;
}

const SolutionRowItem: React.FC<SolutionRowItemProps> = ({ solution, onEdit, onDelete }) => {
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
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Solution Icon */}
          <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <span className="text-lg">{getSolutionIcon(solution.title)}</span>
          </div>
          
          {/* Solution Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {solution.title}
              </h3>
              <Badge variant={getStatusColor(solution.status) as any}>
                {getStatusLabel(solution.status)}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {solution.subtitle}
            </p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                <span>{solution.timesSaved}h poupadas</span>
              </div>
              <div className="flex items-center">
                <Users className="w-3 h-3 mr-1" />
                <span>{solution.usersImpacted} utilizadores</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(solution)}
            className="h-8 px-3"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(solution.id)}
            className="h-8 px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SolutionRowItem;
