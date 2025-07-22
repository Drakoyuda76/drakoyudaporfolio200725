import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ImageManagement from '@/components/admin/ImageManagement';
import { getStatusLabel } from '@/data/solutions';
import type { Solution, SolutionStatus, BusinessArea } from '@/types/solution';

interface SolutionEditSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  solution: Partial<Solution> | null;
  onSave: (solution: Solution) => void;
}

const SolutionEditSheet: React.FC<SolutionEditSheetProps> = ({ isOpen, onOpenChange, solution, onSave }) => {
  const [formData, setFormData] = useState<Partial<Solution>>({});

  useEffect(() => {
    if (solution) {
      setFormData(solution);
    } else {
      // Reset for new solution
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        status: 'conceito',
        businessAreaImpact: [],
        problemSolution: '',
        humanImpact: '',
        sustainabilityImpact: '',
        sdgGoals: [],
        timesSaved: 0,
        usersImpacted: 0,
        images: []
      });
    }
  }, [solution, isOpen]);

  const handleSave = () => {
    if (!formData.title || !formData.subtitle) {
      alert('Por favor, preencha o título e subtítulo.');
      return;
    }
    const finalSolution: Solution = {
      id: formData.id || formData.title!.toLowerCase().replace(/\s+/g, '-'),
      createdAt: formData.createdAt || new Date(),
      updatedAt: new Date(),
      ...formData,
    } as Solution;
    onSave(finalSolution);
    onOpenChange(false);
  };

  const businessAreas: BusinessArea[] = ['front-office', 'back-office', 'core-capabilities', 'products-services'];
  const statuses: SolutionStatus[] = ['conceito', 'prototipo', 'teste-usuarios', 'teste-convite', 'parceria', 'live'];

  const toggleBusinessArea = (area: BusinessArea) => {
    setFormData(prev => ({
      ...prev,
      businessAreaImpact: prev.businessAreaImpact?.includes(area)
        ? prev.businessAreaImpact.filter(a => a !== area)
        : [...(prev.businessAreaImpact || []), area]
    }));
  };

  const addSDGGoal = (goal: number) => {
    setFormData(prev => ({
      ...prev,
      sdgGoals: prev.sdgGoals?.includes(goal)
        ? prev.sdgGoals.filter(g => g !== goal)
        : [...(prev.sdgGoals || []), goal]
    }));
  };

  const sdgOptions = [1, 3, 4, 8, 9, 10, 11, 13, 16];

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{formData.id ? `Editar: ${formData.title}` : 'Criar Nova Solução'}</SheetTitle>
          <SheetDescription>Preencha os detalhes da solução de IA.</SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Dados Gerais</TabsTrigger>
              <TabsTrigger value="impact">Detalhes de Impacto</TabsTrigger>
              <TabsTrigger value="images">Gestão de Imagens</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input id="title" value={formData.title || ''} onChange={(e) => setFormData(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtítulo *</Label>
                <Input id="subtitle" value={formData.subtitle || ''} onChange={(e) => setFormData(p => ({ ...p, subtitle: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(v) => setFormData(p => ({ ...p, status: v as SolutionStatus }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s}>{getStatusLabel(s)}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Áreas de Negócio</Label>
                <div className="flex flex-wrap gap-2">
                  {businessAreas.map(area => (
                    <Badge 
                      key={area} 
                      variant={formData.businessAreaImpact?.includes(area) ? "default" : "outline"} 
                      className="cursor-pointer" 
                      onClick={() => toggleBusinessArea(area)}
                    >
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" value={formData.description || ''} onChange={(e) => setFormData(p => ({ ...p, description: e.target.value }))} rows={5} />
              </div>
            </TabsContent>
            <TabsContent value="impact" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="problemSolution">Problema & Solução</Label>
                <Textarea id="problemSolution" value={formData.problemSolution || ''} onChange={(e) => setFormData(p => ({ ...p, problemSolution: e.target.value }))} rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="humanImpact">Impacto Humano & Benefícios</Label>
                <Textarea id="humanImpact" value={formData.humanImpact || ''} onChange={(e) => setFormData(p => ({ ...p, humanImpact: e.target.value }))} rows={4} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sustainabilityImpact">Impacto & Sustentabilidade</Label>
                <Textarea id="sustainabilityImpact" value={formData.sustainabilityImpact || ''} onChange={(e) => setFormData(p => ({ ...p, sustainabilityImpact: e.target.value }))} rows={4} />
              </div>
              <div className="space-y-2">
                <Label>Objetivos de Desenvolvimento Sustentável (ODS)</Label>
                <div className="flex flex-wrap gap-2">
                  {sdgOptions.map(goal => (
                    <Badge 
                      key={goal} 
                      variant={formData.sdgGoals?.includes(goal) ? "default" : "outline"} 
                      className="cursor-pointer" 
                      onClick={() => addSDGGoal(goal)}
                    >
                      ODS {goal}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="timesSaved">Horas Poupadas</Label>
                  <Input id="timesSaved" type="number" value={formData.timesSaved || 0} onChange={(e) => setFormData(p => ({ ...p, timesSaved: parseInt(e.target.value) || 0 }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="usersImpacted">Utilizadores Impactados</Label>
                  <Input id="usersImpacted" type="number" value={formData.usersImpacted || 0} onChange={(e) => setFormData(p => ({ ...p, usersImpacted: parseInt(e.target.value) || 0 }))} />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="images" className="mt-4">
              <ImageManagement solution={formData as Solution} updateSolution={(updatedSolution) => setFormData(updatedSolution)} />
            </TabsContent>
          </Tabs>
        </div>
        <SheetFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
          <Button onClick={handleSave}>{formData.id ? 'Guardar Alterações' : 'Criar Solução'}</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SolutionEditSheet;