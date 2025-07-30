import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import ImportExportButtons from './ImportExportButtons';

interface CompanyInfo {
  id?: string;
  nome: string;
  descricao: string;
  missao: string;
  visao: string;
  historia: string;
  fundacao_ano: number | null;
}

const CompanyInfoForm = () => {
  const [formData, setFormData] = useState<CompanyInfo>({
    nome: '',
    descricao: '',
    missao: '',
    visao: '',
    historia: '',
    fundacao_ano: null
  });
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    loadCompanyInfo();
  }, []);

  const loadCompanyInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('empresa_info')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Error loading company info:', error);
        return;
      }

      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error loading company info:', error);
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
          .from('empresa_info')
          .update(formData)
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('empresa_info')
          .insert([formData]);

        if (error) throw error;
      }

      toast({
        title: "Sucesso!",
        description: "Informações da empresa salvas com sucesso.",
      });

      // Reload data to get the ID if it was a new record
      await loadCompanyInfo();
    } catch (error) {
      console.error('Error saving company info:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar informações da empresa. Tente novamente.",
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
    
    const exportFileDefaultName = `empresa_info_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Sucesso!",
      description: "Informações da empresa exportadas com sucesso.",
    });
  };

  const importData = async (data: any) => {
    try {
      // Update form data
      setFormData({
        id: formData.id, // Keep existing ID
        nome: data.nome || '',
        descricao: data.descricao || '',
        missao: data.missao || '',
        visao: data.visao || '',
        historia: data.historia || '',
        fundacao_ano: data.fundacao_ano || new Date().getFullYear()
      });

      // Save to database
      if (formData.id) {
        const { error } = await supabase
          .from('empresa_info')
          .update({
            nome: data.nome,
            descricao: data.descricao,
            missao: data.missao,
            visao: data.visao,
            historia: data.historia,
            fundacao_ano: data.fundacao_ano
          })
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('empresa_info')
          .insert({
            nome: data.nome,
            descricao: data.descricao,
            missao: data.missao,
            visao: data.visao,
            historia: data.historia,
            fundacao_ano: data.fundacao_ano
          });

        if (error) throw error;
      }

      await loadCompanyInfo();
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
          <CardTitle>Informações da Empresa</CardTitle>
          <CardDescription>
            Gerir as informações gerais da empresa
          </CardDescription>
        </div>
        <ImportExportButtons
          onExport={exportData}
          onImport={importData}
          exportFilename="empresa_info"
        />
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Empresa</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
              placeholder="Nome da empresa"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              placeholder="Descrição da empresa"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="missao">Missão</Label>
            <Textarea
              id="missao"
              value={formData.missao}
              onChange={(e) => setFormData(prev => ({ ...prev, missao: e.target.value }))}
              placeholder="Missão da empresa"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="visao">Visão</Label>
            <Textarea
              id="visao"
              value={formData.visao}
              onChange={(e) => setFormData(prev => ({ ...prev, visao: e.target.value }))}
              placeholder="Visão da empresa"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="historia">História</Label>
            <Textarea
              id="historia"
              value={formData.historia}
              onChange={(e) => setFormData(prev => ({ ...prev, historia: e.target.value }))}
              placeholder="História da empresa"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fundacao_ano">Ano de Fundação</Label>
            <Input
              id="fundacao_ano"
              type="number"
              value={formData.fundacao_ano || ''}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                fundacao_ano: e.target.value ? parseInt(e.target.value) : null 
              }))}
              placeholder="2024"
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Informações
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CompanyInfoForm;