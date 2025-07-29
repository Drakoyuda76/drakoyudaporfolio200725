import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, X, Upload, Image } from 'lucide-react';

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
    status: 'conceito' as 'conceito' | 'prototipo' | 'teste-usuarios' | 'teste-convite' | 'parceria' | 'live',
    business_area_impact: [] as string[],
    problem_solution: '',
    human_impact: '',
    sustainability_impact: '',
    sdg_goals: [] as number[],
    times_saved: 0,
    users_impacted: 0,
    icon_url: ''
  });

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
        icon_url: solution.icon_url || ''
      });
    }
  }, [solution]);

  // Convert file to webp format and upload
  const uploadFile = async (file: File, path: string): Promise<string> => {
    // Convert to webp if it's an image
    let fileToUpload = file;
    if (file.type.startsWith('image/')) {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const img = document.createElement('img');
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = URL.createObjectURL(file);
        });
        
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        const webpBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((blob) => resolve(blob!), 'image/webp', 0.8);
        });
        
        fileToUpload = new File([webpBlob], path.replace(/\.[^/.]+$/, '.webp'), { type: 'image/webp' });
        URL.revokeObjectURL(img.src);
      } catch (error) {
        console.warn('Failed to convert to webp, using original file:', error);
      }
    }

    const { data, error } = await supabase.storage
      .from('drakoyuda-images')
      .upload(path, fileToUpload, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('drakoyuda-images')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
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
      // Validate minimum images
      if (!solution && imageFiles.length < 3) {
        toast({
          title: "Mínimo 3 imagens",
          description: "Por favor, selecione pelo menos 3 imagens de demonstração.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      let iconUrl = formData.icon_url;

      // Upload icon if provided
      if (iconFile) {
        const iconPath = `icons/${Date.now()}_${iconFile.name}`;
        iconUrl = await uploadFile(iconFile, iconPath);
      }

      const updatedData = {
        ...formData,
        icon_url: iconUrl,
        sdg_goals: formData.sdg_goals || [],
        business_area_impact: formData.business_area_impact || []
      };

      let solutionId = solution?.id;

      if (solution) {
        // Update existing solution
        const { error } = await supabase
          .from('solucoes')
          .update(updatedData)
          .eq('id', solution.id);

        if (error) throw error;
      } else {
        // Create new solution
        const { data, error } = await supabase
          .from('solucoes')
          .insert([updatedData])
          .select()
          .single();

        if (error) throw error;
        solutionId = data.id;
      }

      // Upload and save demonstration images
      if (imageFiles.length > 0 && solutionId) {
        // Delete existing images for this solution if updating
        if (solution) {
          await supabase
            .from('solucao_imagens')
            .delete()
            .eq('solucao_id', solutionId);
        }

        // Upload new images
        const uploadPromises = imageFiles.map(async (file, index) => {
          const imagePath = `demo-images/${solutionId}/${Date.now()}_${index}_${file.name}`;
          const imageUrl = await uploadFile(file, imagePath);
          
          return supabase
            .from('solucao_imagens')
            .insert({
              solucao_id: solutionId,
              imagem_url: imageUrl
            });
        });

        await Promise.all(uploadPromises);
      }

      toast({
        title: "Sucesso!",
        description: solution ? "Solução atualizada com sucesso." : "Solução criada com sucesso.",
      });

      onSave();
    } catch (error) {
      console.error('Error saving solution:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar a solução. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo *</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
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
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as any }))}>
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
            <div className="space-y-2">
              <Label htmlFor="times_saved">Horas Poupadas</Label>
              <Input
                id="times_saved"
                type="number"
                value={formData.times_saved}
                onChange={(e) => setFormData(prev => ({ ...prev, times_saved: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="users_impacted">Utilizadores Impactados</Label>
              <Input
                id="users_impacted"
                type="number"
                value={formData.users_impacted}
                onChange={(e) => setFormData(prev => ({ ...prev, users_impacted: parseInt(e.target.value) || 0 }))}
              />
            </div>
          </div>

          {/* Ícone da Solução */}
          <div className="space-y-2">
            <Label htmlFor="icon">Ícone da Solução</Label>
            <div className="flex items-center gap-4">
              <Input
                id="icon"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setIconFile(file);
                }}
                className="flex-1"
              />
              {formData.icon_url && (
                <div className="w-16 h-16 rounded border overflow-hidden">
                  <img 
                    src={formData.icon_url} 
                    alt="Ícone atual" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
            {iconFile && (
              <p className="text-sm text-muted-foreground">
                Novo ícone selecionado: {iconFile.name}
              </p>
            )}
            {!formData.icon_url && !iconFile && (
              <p className="text-sm text-muted-foreground">
                Nenhum ícone definido - será exibido "Sem ícone" no frontend
              </p>
            )}
          </div>

          {/* Imagens de Demonstração */}
          <div className="space-y-2">
            <Label htmlFor="images">Imagens de Demonstração (Mínimo 3 imagens)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4">
                  <Label htmlFor="images" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-foreground">
                      Carregar imagens de demonstração
                    </span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      PNG, JPG, WEBP até 10MB cada
                    </span>
                  </Label>
                  <Input
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      if (files.length < 3) {
                        toast({
                          title: "Mínimo 3 imagens",
                          description: "Por favor, selecione pelo menos 3 imagens de demonstração.",
                          variant: "destructive",
                        });
                        return;
                      }
                      setImageFiles(files);
                    }}
                  />
                </div>
              </div>
            </div>
            
            {imageFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {imageFiles.length} imagens selecionadas para upload
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {imageFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded border overflow-hidden">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        size="icon"
                        variant="destructive"
                        className="absolute -top-2 -right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          const newFiles = imageFiles.filter((_, i) => i !== index);
                          setImageFiles(newFiles);
                        }}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!imageFiles.length && !solution && (
              <p className="text-sm text-muted-foreground">
                Nenhuma imagem selecionada - será exibido "Sem imagens de demonstração" no frontend
              </p>
            )}
          </div>

          {/* Áreas de Negócio */}
          <div className="space-y-2">
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
          <div className="space-y-2">
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
          <div className="space-y-2">
            <Label htmlFor="problem_solution">Problema e Solução</Label>
            <Textarea
              id="problem_solution"
              value={formData.problem_solution}
              onChange={(e) => setFormData(prev => ({ ...prev, problem_solution: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="human_impact">Impacto Humano</Label>
            <Textarea
              id="human_impact"
              value={formData.human_impact}
              onChange={(e) => setFormData(prev => ({ ...prev, human_impact: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sustainability_impact">Impacto de Sustentabilidade</Label>
            <Textarea
              id="sustainability_impact"
              value={formData.sustainability_impact}
              onChange={(e) => setFormData(prev => ({ ...prev, sustainability_impact: e.target.value }))}
              rows={3}
            />
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