import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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
        .single();

      if (error && error.code !== 'PGRST116') {
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
      <CardHeader>
        <CardTitle>Estatísticas da Empresa</CardTitle>
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