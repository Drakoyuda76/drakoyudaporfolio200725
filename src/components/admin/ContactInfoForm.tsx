import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface ContactInfo {
  id?: string;
  telefone: string;
  email_geral: string;
  email_parcerias: string;
  endereco: string;
  linkedin_url: string;
}

const ContactInfoForm = () => {
  const [formData, setFormData] = useState<ContactInfo>({
    telefone: '',
    email_geral: '',
    email_parcerias: '',
    endereco: '',
    linkedin_url: ''
  });
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('empresa_contactos')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading contact info:', error);
        return;
      }

      if (data) {
        setFormData(data);
      }
    } catch (error) {
      console.error('Error loading contact info:', error);
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
          .from('empresa_contactos')
          .update(formData)
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('empresa_contactos')
          .insert([formData]);

        if (error) throw error;
      }

      toast({
        title: "Sucesso!",
        description: "Informações de contacto salvas com sucesso.",
      });

      // Reload data to get the ID if it was a new record
      await loadContactInfo();
    } catch (error) {
      console.error('Error saving contact info:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar informações de contacto. Tente novamente.",
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
        <CardTitle>Informações de Contacto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={formData.telefone}
              onChange={(e) => setFormData(prev => ({ ...prev, telefone: e.target.value }))}
              placeholder="+244 XXX XXX XXX"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email_geral">Email Geral</Label>
            <Input
              id="email_geral"
              type="email"
              value={formData.email_geral}
              onChange={(e) => setFormData(prev => ({ ...prev, email_geral: e.target.value }))}
              placeholder="geral@drakoyuda.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email_parcerias">Email de Parcerias</Label>
            <Input
              id="email_parcerias"
              type="email"
              value={formData.email_parcerias}
              onChange={(e) => setFormData(prev => ({ ...prev, email_parcerias: e.target.value }))}
              placeholder="parcerias@drakoyuda.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endereco">Endereço</Label>
            <Input
              id="endereco"
              value={formData.endereco}
              onChange={(e) => setFormData(prev => ({ ...prev, endereco: e.target.value }))}
              placeholder="Endereço da empresa"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin_url">LinkedIn URL</Label>
            <Input
              id="linkedin_url"
              type="url"
              value={formData.linkedin_url}
              onChange={(e) => setFormData(prev => ({ ...prev, linkedin_url: e.target.value }))}
              placeholder="https://linkedin.com/company/drakoyuda"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Contactos
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactInfoForm;