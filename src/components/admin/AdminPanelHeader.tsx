
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminPanelHeaderProps {
  solutionsCount: number;
  totalHoursSaved: number;
  onValidatePortfolio: () => void;
  onExportData: () => void;
  onNewSolution: () => void;
}

const AdminPanelHeader: React.FC<AdminPanelHeaderProps> = ({
  solutionsCount,
  totalHoursSaved,
  onValidatePortfolio,
  onExportData,
  onNewSolution,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Navigation */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Voltar ao Portfólio</span>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Painel Administrativo
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {solutionsCount} soluções • {totalHoursSaved.toLocaleString()}h poupadas
              </p>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              onClick={onValidatePortfolio}
              variant="outline"
              size="sm"
              className="bg-green-50 hover:bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Validar
            </Button>
            
            <Button
              onClick={onExportData}
              variant="outline"
              size="sm"
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            
            <Button
              onClick={onNewSolution}
              size="sm"
              className="bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nova Solução
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanelHeader;
