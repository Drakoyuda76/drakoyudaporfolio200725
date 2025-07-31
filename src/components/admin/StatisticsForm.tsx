import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import ImportExportButtons from './ImportExportButtons';

interface Statistics {
  id?: string;
  total_solucoes: number;
  solucoes_ativas: number;
  parcerias_ativas: number;
  total_horas_poupadas: number;
  total_utilizadores_impactados: number;
}

const StatisticsForm = () => {
  const [formData, setFormData] = useState<Statistics>({
    total_solucoes: 0,
    solucoes_ativas: 0,
    parcerias_ativas: 0,
    total_horas_poupadas: 0,
    total_utilizadores_impactados: 0
  });
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      const { data, error } = await supabase
        .from('estatisticas')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error loading statistics:', error);
        return;
      }

      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error loading statistics:', error);
    } finally {
      setInitialLoad(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (formData.id) {
        // Update existing
        const { error } = await supabase
          .from('estatisticas')
          .update(formData)
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('estatisticas')
          .insert([formData]);

        if (error) throw error;
      }

      toast({
        title: "Sucesso!",
        description: "Estatísticas salvas com sucesso.",
      });

      // Reload data to get the ID if it was a new record
      await loadStatistics();
    } catch (error) {
      console.error('Error saving statistics:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar estatísticas. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportData = () => {
    const exportData = {
      ...formData,
      exported_at: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `estatisticas_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Sucesso!",
      description: "Estatísticas exportadas com sucesso.",
    });
  };

  const importData = async (data: any) => {
    try {
      const newFormData = {
        id: formData.id,
        total_solucoes: data.total_solucoes || 0,
        solucoes_ativas: data.solucoes_ativas || 0,
        parcerias_ativas: data.parcerias_ativas || 0,
        total_horas_poupadas: data.total_horas_poupadas || 0,
        total_utilizadores_impactados: data.total_utilizadores_impactados || 0
      };

      setFormData(newFormData);

      if (formData.id) {
        const { error } = await supabase
          .from('estatisticas')
          .update(newFormData)
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('estatisticas')
          .insert([newFormData]);

        if (error) throw error;
      }

      await loadStatistics();
    } catch (error) {
      throw error;
    }
  };

  if (initialLoad) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Estatísticas da Empresa</CardTitle>
          <CardDescription>
            Gerir as estatísticas da empresa
          </CardDescription>
        </div>
        <ImportExportButtons
          onExport={exportData}
          onImport={importData}
          exportFilename="estatisticas"
        />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total_solucoes">Total de Soluções</Label>
              <Input
                id="total_solucoes"
                type="number"
                value={formData.total_solucoes}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  total_solucoes: parseInt(e.target.value) || 0 
                }))}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solucoes_ativas">Soluções Ativas</Label>
              <Input
                id="solucoes_ativas"
                type="number"
                value={formData.solucoes_ativas}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  solucoes_ativas: parseInt(e.target.value) || 0 
                }))}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="parcerias_ativas">Parcerias Ativas</Label>
              <Input
                id="parcerias_ativas"
                type="number"
                value={formData.parcerias_ativas}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  parcerias_ativas: parseInt(e.target.value) || 0 
                }))}
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_horas_poupadas">Total de Horas Poupadas</Label>
              <Input
                id="total_horas_poupadas"
                type="number"
                value={formData.total_horas_poupadas}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  total_horas_poupadas: parseInt(e.target.value) || 0 
                }))}
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="total_utilizadores_impactados">Total de Utilizadores Impactados</Label>
            <Input
              id="total_utilizadores_impactados"
              type="number"
              value={formData.total_utilizadores_impactados}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                total_utilizadores_impactados: parseInt(e.target.value) || 0 
              }))}
              min="0"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Estatísticas
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StatisticsForm;