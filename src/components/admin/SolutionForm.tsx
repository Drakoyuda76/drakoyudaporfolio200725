import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, X, Plus, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ImageManagement from './ImageManagement';

interface SolutionFormProps {
  solution?: any;
  onSave: () => void;
  onCancel: () => void;
}

const SolutionForm: React.FC<SolutionFormProps> = ({ solution, onSave, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    status: 'conceito',
    business_area_impact: [] as string[],
    problem_solution: '',
    human_impact: '',
    sustainability_impact: '',
    sdg_goals: [] as number[],
    times_saved: 0,
    users_impacted: 0,
    icon_url: '',
    images_urls: [] as string[]
  });

  const { toast } = useToast();

  const statusOptions = [
    { value: 'conceito', label: 'Conceito' },
    { value: 'prototipo', label: 'Protótipo' },
    { value: 'teste-usuarios', label: 'Teste com Utilizadores' },
    { value: 'teste-convite', label: 'Teste por Convite' },
    { value: 'parceria', label: 'Parceria' },
    { value: 'live', label: 'Live' }
  ];

  const businessAreas = [
    'front-office',
    'back-office', 
    'core-capabilities',
    'products-services'
  ];

  const sdgOptions = Array.from({ length: 17 }, (_, i) => i + 1);

  useEffect(() => {
    if (solution) {
      setFormData({
        title: solution.title || '',
        subtitle: solution.subtitle || '',
        description: solution.description || '',
        status: solution.status || 'conceito',
        business_area_impact: solution.business_area_impact || [],
        problem_solution: solution.problem_solution || '',
        human_impact: solution.human_impact || '',
        sustainability_impact: solution.sustainability_impact || '',
        sdg_goals: solution.sdg_goals || [],
        times_saved: solution.times_saved || 0,
        users_impacted: solution.users_impacted || 0,
        icon_url: solution.icon_url || '',
        images_urls: solution.images_urls || []
      });
    }
  }, [solution]);

  const uploadFile = async (file: File, path: string): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}/${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('drakoyuda-images')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('drakoyuda-images')
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleBusinessAreaChange = (area: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      business_area_impact: checked 
        ? [...prev.business_area_impact, area]
        : prev.business_area_impact.filter(a => a !== area)
    }));
  };

  const handleSDGChange = (sdg: number, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      sdg_goals: checked 
        ? [...prev.sdg_goals, sdg]
        : prev.sdg_goals.filter(s => s !== sdg)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let iconUrl = formData.icon_url;
      let imagesUrls = [...formData.images_urls];

      // Upload icon if new file selected
      if (iconFile) {
        iconUrl = await uploadFile(iconFile, 'icons');
      }

      // Upload new images
      if (imageFiles.length > 0) {
        const uploadPromises = imageFiles.map(file => uploadFile(file, 'images'));
        const newImageUrls = await Promise.all(uploadPromises);
        imagesUrls = [...imagesUrls, ...newImageUrls];
      }

      const solutionData = {
        ...formData,
        icon_url: iconUrl,
        images_urls: imagesUrls,
        status: formData.status as 'conceito' | 'prototipo' | 'teste-usuarios' | 'teste-convite' | 'parceria' | 'live'
      };

      if (solution?.id) {
        // Update existing solution
        const { error } = await supabase
          .from('solucoes')
          .update(solutionData)
          .eq('id', solution.id);

        if (error) throw error;

        toast({
          title: "Solução atualizada",
          description: "A solução foi atualizada com sucesso.",
        });
      } else {
        // Create new solution
        const { error } = await supabase
          .from('solucoes')
          .insert(solutionData);

        if (error) throw error;

        toast({
          title: "Solução criada",
          description: "A nova solução foi criada com sucesso.",
        });
      }

      onSave();
    } catch (error) {
      console.error('Erro ao salvar solução:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar a solução. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images_urls: prev.images_urls.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>
          {solution?.id ? 'Editar Solução' : 'Nova Solução'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações Básicas */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtítulo *</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              required
            />
          </div>

          {/* Status e Métricas */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="times_saved">Horas Poupadas</Label>
              <Input
                id="times_saved"
                type="number"
                value={formData.times_saved}
                onChange={(e) => setFormData(prev => ({ ...prev, times_saved: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="users_impacted">Utilizadores Impactados</Label>
              <Input
                id="users_impacted"
                type="number"
                value={formData.users_impacted}
                onChange={(e) => setFormData(prev => ({ ...prev, users_impacted: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          {/* Áreas de Negócio */}
          <div>
            <Label>Áreas de Impacto no Negócio</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {businessAreas.map(area => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.business_area_impact.includes(area)}
                    onCheckedChange={(checked) => handleBusinessAreaChange(area, checked as boolean)}
                  />
                  <Label htmlFor={area} className="text-sm">
                    {area.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* SDGs */}
          <div>
            <Label>Objetivos de Desenvolvimento Sustentável (SDGs)</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {sdgOptions.map(sdg => (
                <div key={sdg} className="flex items-center space-x-2">
                  <Checkbox
                    id={`sdg-${sdg}`}
                    checked={formData.sdg_goals.includes(sdg)}
                    onCheckedChange={(checked) => handleSDGChange(sdg, checked as boolean)}
                  />
                  <Label htmlFor={`sdg-${sdg}`} className="text-sm">
                    SDG {sdg}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Detalhes Adicionais */}
          <div>
            <Label htmlFor="problem_solution">Problema e Solução</Label>
            <Textarea
              id="problem_solution"
              value={formData.problem_solution}
              onChange={(e) => setFormData(prev => ({ ...prev, problem_solution: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="human_impact">Impacto Humano</Label>
            <Textarea
              id="human_impact"
              value={formData.human_impact}
              onChange={(e) => setFormData(prev => ({ ...prev, human_impact: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="sustainability_impact">Impacto de Sustentabilidade</Label>
            <Textarea
              id="sustainability_impact"
              value={formData.sustainability_impact}
              onChange={(e) => setFormData(prev => ({ ...prev, sustainability_impact: e.target.value }))}
              rows={3}
            />
          </div>

          {/* Upload de Ícone */}
          <div>
            <Label>Ícone da Solução</Label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setIconFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground"
              />
              {formData.icon_url && (
                <div className="mt-2">
                  <img src={formData.icon_url} alt="Ícone atual" className="w-16 h-16 object-cover rounded" />
                </div>
              )}
            </div>
          </div>

          {/* Upload de Imagens */}
          <div>
            <Label>Imagens de Demonstração</Label>
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground"
              />
              {formData.images_urls.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {formData.images_urls.map((url, index) => (
                    <div key={index} className="relative">
                      <img src={url} alt={`Imagem ${index + 1}`} className="w-full h-20 object-cover rounded" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 w-6 h-6 p-0"
                        onClick={() => handleImageRemove(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {solution?.id ? 'Atualizar' : 'Criar'} Solução
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SolutionForm;