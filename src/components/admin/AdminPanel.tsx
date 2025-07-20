import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Upload, FileText, Save, X, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { getSolutions, getStatusLabel, getStatusColor, updateSolutions } from '@/data/solutions';
import { saveSolutions, loadSolutions, exportSolutionsAsJSON, clearStorageData } from '@/utils/storage';
import type { Solution, SolutionStatus, BusinessArea } from '@/types/solution';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [localSolutions, setLocalSolutions] = useState<Solution[]>(() => getSolutions());

  const businessAreas: BusinessArea[] = ['front-office', 'back-office', 'core-capabilities', 'products-services'];
  const statuses: SolutionStatus[] = ['conceito', 'prototipo', 'teste-usuarios', 'teste-convite', 'parceria', 'live'];

  const [formData, setFormData] = useState<Partial<Solution>>({
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

  const resetForm = () => {
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
  };

  const handleEdit = (solution: Solution) => {
    setFormData(solution);
    setEditingId(solution.id);
    setShowAddForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta solução?')) {
      const updatedSolutions = localSolutions.filter(s => s.id !== id);
      setLocalSolutions(updatedSolutions);
      updateSolutions(updatedSolutions);
      saveSolutions(updatedSolutions);
    }
  };

  const handleSave = () => {
    if (!formData.title || !formData.subtitle) {
      alert('Por favor, preencha pelo menos o título e subtítulo.');
      return;
    }

    const newSolution: Solution = {
      ...formData,
      id: editingId || formData.title!.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      createdAt: editingId ? localSolutions.find(s => s.id === editingId)?.createdAt || new Date() : new Date(),
      updatedAt: new Date(),
    } as Solution;

    let updatedSolutions: Solution[];
    if (editingId) {
      updatedSolutions = localSolutions.map(s => s.id === editingId ? newSolution : s);
    } else {
      updatedSolutions = [...localSolutions, newSolution];
    }

    setLocalSolutions(updatedSolutions);
    updateSolutions(updatedSolutions);
    saveSolutions(updatedSolutions);

    setShowAddForm(false);
    setEditingId(null);
    resetForm();
  };

  const handleImportMD = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/markdown') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          description: content
        }));
      };
      reader.readAsText(file);
    }
  };

  const toggleBusinessArea = (area: BusinessArea) => {
    setFormData(prev => ({
      ...prev,
      businessAreaImpact: prev.businessAreaImpact?.includes(area)
        ? prev.businessAreaImpact.filter(a => a !== area)
        : [...(prev.businessAreaImpact || []), area]
    }));
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

  const handleRefreshData = () => {
    if (confirm('Isto irá recarregar os dados do localStorage. Continuar?')) {
      const savedData = loadSolutions();
      if (savedData) {
        setLocalSolutions(savedData);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar ao Portfólio</span>
            </Button>
            <div>
              <h1 className="font-tomorrow font-semibold text-3xl text-foreground">
                Painel Administrativo
              </h1>
              <p className="text-muted-foreground">
                DrakoYuda Soluções - Gestão de AI Microsolutions e Serviços
              </p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline"
              onClick={handleExportData}
              className="flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Exportar</span>
            </Button>
            <Button 
              variant="outline"
              onClick={handleRefreshData}
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Recarregar</span>
            </Button>
            <Button 
              onClick={() => {
                setShowAddForm(true);
                setEditingId(null);
                resetForm();
              }}
              className="bg-accent hover:bg-accent/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Nova Solução
            </Button>
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {editingId ? 'Editar Solução' : 'Adicionar Nova Solução'}
              </CardTitle>
              <CardDescription>
                Preencha os dados da solução de IA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título *</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Assistente Financeiro Pessoal"
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle">Subtítulo *</Label>
                  <Input
                    id="subtitle"
                    value={formData.subtitle || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Ex: IA para Gestão Financeira Inteligente"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select 
                    value={formData.status} 
                    onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as SolutionStatus }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map(status => (
                        <SelectItem key={status} value={status}>
                          {getStatusLabel(status)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Áreas de Negócio</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {businessAreas.map(area => (
                      <Badge
                        key={area}
                        variant={formData.businessAreaImpact?.includes(area) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => toggleBusinessArea(area)}
                      >
                        {area.replace('-', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descrição da solução..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="problemSolution">Problema & Solução</Label>
                <Textarea
                  id="problemSolution"
                  value={formData.problemSolution || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, problemSolution: e.target.value }))}
                  placeholder="Descrição do problema e como a solução resolve..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="humanImpact">Impacto Humano</Label>
                <Textarea
                  id="humanImpact"
                  value={formData.humanImpact || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, humanImpact: e.target.value }))}
                  placeholder="Como a solução impacta positivamente as pessoas..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="timesSaved">Horas Poupadas</Label>
                  <Input
                    id="timesSaved"
                    type="number"
                    value={formData.timesSaved || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, timesSaved: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="usersImpacted">Utilizadores Impactados</Label>
                  <Input
                    id="usersImpacted"
                    type="number"
                    value={formData.usersImpacted || 0}
                    onChange={(e) => setFormData(prev => ({ ...prev, usersImpacted: parseInt(e.target.value) || 0 }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mdImport">Importar Arquivo MD</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="mdImport"
                    type="file"
                    accept=".md,.markdown"
                    onChange={handleImportMD}
                    className="file:mr-2 file:py-1 file:px-3 file:rounded file:border-0 file:bg-accent file:text-accent-foreground"
                  />
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false);
                    setEditingId(null);
                    resetForm();
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancelar
                </Button>
                <Button onClick={handleSave} className="bg-accent hover:bg-accent/90">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Solutions List */}
        <div className="space-y-4">
          <h2 className="font-tomorrow font-semibold text-2xl text-foreground">
            Soluções Cadastradas ({localSolutions.length})
          </h2>
          
          <div className="grid gap-4">
            {localSolutions.map((solution) => (
              <Card key={solution.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-tomorrow font-semibold text-lg text-foreground">
                          {solution.title}
                        </h3>
                        <Badge variant={getStatusColor(solution.status) as any}>
                          {getStatusLabel(solution.status)}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{solution.subtitle}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {solution.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {solution.businessAreaImpact.map(area => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {area.replace('-', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(solution)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(solution.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;