
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { Solution } from '@/types/solution';
import { getSolutionsFromDB, saveSolutionToDB, deleteSolutionFromDB } from '@/utils/solutionService';
import { exportSolutionsAsJSON } from '@/utils/storage';
import AdminPanelHeader from './AdminPanelHeader';
import SolutionRowItem from './SolutionRowItem';
import SolutionEditSheet from './SolutionEditSheet';

const AdminPanel = () => {
  const [localSolutions, setLocalSolutions] = useState<Solution[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingSolution, setEditingSolution] = useState<Partial<Solution> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadSolutions = async () => {
      try {
        const solutions = await getSolutionsFromDB();
        setLocalSolutions(solutions);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível carregar as soluções.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSolutions();
  }, [toast]);

  const handleEdit = (solution: Solution) => {
    setEditingSolution(solution);
    setIsSheetOpen(true);
  };

  const handleAddNew = () => {
    setEditingSolution(null);
    setIsSheetOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta solução?')) {
      try {
        const success = await deleteSolutionFromDB(id);
        if (success) {
          const updatedSolutions = localSolutions.filter(solution => solution.id !== id);
          setLocalSolutions(updatedSolutions);
          toast({
            title: "Sucesso!",
            description: "Solução excluída com sucesso.",
          });
        } else {
          throw new Error('Falha ao excluir');
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível excluir a solução.",
        });
      }
    }
  };

  const handleSave = async (solutionToSave: Solution) => {
    try {
      const success = await saveSolutionToDB(solutionToSave);
      if (success) {
        const existingIndex = localSolutions.findIndex(s => s.id === solutionToSave.id);
        let updatedSolutions;
        
        if (existingIndex >= 0) {
          updatedSolutions = [...localSolutions];
          updatedSolutions[existingIndex] = solutionToSave;
        } else {
          updatedSolutions = [...localSolutions, solutionToSave];
        }
        
        setLocalSolutions(updatedSolutions);
      } else {
        throw new Error('Falha ao salvar');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível salvar a solução.",
      });
    }
  };

  const handleExportData = () => {
    const dataStr = exportSolutionsAsJSON(localSolutions);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `drakoyuda-solutions-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const validatePortfolioContent = () => {
    const solutions = localSolutions;
    const issues: string[] = [];

    if (!solutions || solutions.length === 0) {
      issues.push('Nenhuma solução encontrada');
      return issues;
    }

    solutions.forEach(solution => {
      if (!solution.title) issues.push(`Solução ${solution.id}: Título em falta`);
      if (!solution.description) issues.push(`Solução ${solution.id}: Descrição em falta`);
      if (!solution.images || solution.images.length < 3) issues.push(`Solução ${solution.id}: Menos de 3 imagens`);
      if (!solution.humanImpact) issues.push(`Solução ${solution.id}: Impacto humano em falta`);
      if (!solution.sustainabilityImpact) issues.push(`Solução ${solution.id}: Impacto sustentabilidade em falta`);
      if (!solution.problemSolution) issues.push(`Solução ${solution.id}: Problema & Solução em falta`);
    });

    return issues;
  };

  const runPortfolioValidation = () => {
    const issues = validatePortfolioContent();
    if (issues.length === 0) {
      alert('✅ Portfólio pronto para demonstração!\n\n• Soluções completas\n• Todas as imagens configuradas\n• Conteúdo validado');
    } else {
      alert(`⚠️ Questões encontradas (${issues.length}):\n\n${issues.slice(0, 5).join('\n')}${issues.length > 5 ? '\n...' : ''}`);
    }
  };

  const totalHoursSaved = localSolutions.reduce((sum, solution) => sum + solution.timesSaved, 0);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminPanelHeader
        solutionsCount={localSolutions.length}
        totalHoursSaved={totalHoursSaved}
        onValidatePortfolio={runPortfolioValidation}
        onExportData={handleExportData}
        onNewSolution={handleAddNew}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Gestão de Soluções
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {localSolutions.map((solution) => (
              <SolutionRowItem
                key={solution.id}
                solution={solution}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      <SolutionEditSheet
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        solution={editingSolution}
        onSave={handleSave}
      />
    </div>
  );
};

export default AdminPanel;
