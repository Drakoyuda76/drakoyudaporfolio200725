import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Settings, Users, Building2, BarChart3, FileText, Plus, Download, Upload } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import SolutionForm from './SolutionForm';
import CompanyInfoForm from './CompanyInfoForm';
import ContactInfoForm from './ContactInfoForm';
import StatisticsForm from './StatisticsForm';
import UserManagement from './UserManagement';
import ImportExportButtons from './ImportExportButtons';

const AdminPanel = () => {
  const [solutions, setSolutions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSolution, setEditingSolution] = useState<any>(null);
  const [showSolutionForm, setShowSolutionForm] = useState(false);

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('solucoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSolutions(data || []);
    } catch (error) {
      console.error('Erro ao carregar soluções:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar soluções. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditSolution = (solution: any) => {
    setEditingSolution(solution);
    setShowSolutionForm(true);
  };

  const handleDeleteSolution = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta solução?')) return;
    
    try {
      // Delete related images first
      await supabase
        .from('solucao_imagens')
        .delete()
        .eq('solucao_id', id);

      // Delete solution
      const { error } = await supabase
        .from('solucoes')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Solução excluída com sucesso.",
      });

      await loadSolutions();
    } catch (error) {
      console.error('Erro ao excluir solução:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir solução. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const exportSolutions = () => {
    const exportData = solutions.map(solution => ({
      title: solution.title,
      subtitle: solution.subtitle,
      description: solution.description,
      problem_solution: solution.problem_solution,
      business_area_impact: solution.business_area_impact,
      sdg_goals: solution.sdg_goals,
      times_saved: solution.times_saved,
      users_impacted: solution.users_impacted,
      status: solution.status,
      sustainability_impact: solution.sustainability_impact,
      human_impact: solution.human_impact,
      // Exclude images and icon_url as they need manual management
      icon_url: '',
      images_urls: []
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `solucoes_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Sucesso!",
      description: "Soluções exportadas com sucesso.",
    });
  };

  const importSolutions = async (data: any) => {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Formato de arquivo inválido. Esperado um array de soluções.');
      }

      for (const solutionData of data) {
        await supabase
          .from('solucoes')
          .insert({
            title: solutionData.title,
            subtitle: solutionData.subtitle,
            description: solutionData.description,
            problem_solution: solutionData.problem_solution,
            business_area_impact: solutionData.business_area_impact,
            sdg_goals: solutionData.sdg_goals,
            times_saved: solutionData.times_saved,
            users_impacted: solutionData.users_impacted,
            status: solutionData.status,
            sustainability_impact: solutionData.sustainability_impact,
            human_impact: solutionData.human_impact,
            // Images and icons will be added manually
            icon_url: '',
            images_urls: []
          });
      }

      toast({
        title: "Sucesso!",
        description: `${data.length} soluções importadas com sucesso.`,
      });

      await loadSolutions();
    } catch (error) {
      throw error;
    }
  };

  const handleSolutionSaved = async () => {
    setShowSolutionForm(false);
    setEditingSolution(null);
    await loadSolutions();
  };

  if (showSolutionForm) {
    return (
      <div className="min-h-screen bg-background">
        <SolutionForm
          solution={editingSolution}
          onSave={handleSolutionSaved}
          onCancel={() => {
            setShowSolutionForm(false);
            setEditingSolution(null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Painel Administrativo</h1>
          <p className="text-muted-foreground">Gerir conteúdos e configurações do sistema</p>
        </div>

        <Tabs defaultValue="solutions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="solutions" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Soluções
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="contacts" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Contactos
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Estatísticas
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Usuários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="solutions" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestão de Soluções</CardTitle>
                  <CardDescription>
                    Adicionar, editar e remover soluções do portfólio
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <ImportExportButtons
                    onExport={exportSolutions}
                    onImport={importSolutions}
                    exportFilename="solucoes"
                  />
                  <Button 
                    onClick={() => {
                      setEditingSolution(null);
                      setShowSolutionForm(true);
                    }}
                    className="flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Nova Solução
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2">A carregar soluções...</span>
                  </div>
                ) : solutions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">Nenhuma solução encontrada.</p>
                    <Button 
                      onClick={() => {
                        setEditingSolution(null);
                        setShowSolutionForm(true);
                      }}
                    >
                      Criar primeira solução
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {solutions.map((solution) => (
                      <div 
                        key={solution.id} 
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold">{solution.title}</h3>
                          <p className="text-sm text-muted-foreground">{solution.subtitle}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>Status: {solution.status}</span>
                            <span>Horas poupadas: {solution.times_saved || 0}</span>
                            <span>Utilizadores: {solution.users_impacted || 0}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSolution(solution)}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteSolution(solution.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company">
            <CompanyInfoForm />
          </TabsContent>

          <TabsContent value="contacts">
            <ContactInfoForm />
          </TabsContent>

          <TabsContent value="statistics">
            <StatisticsForm />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;