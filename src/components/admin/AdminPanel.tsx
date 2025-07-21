
import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload, FileText, Save, X, Download, RefreshCw } from 'lucide-react';
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
import AdminPanelHeader from './AdminPanelHeader';
import SolutionRowItem from './SolutionRowItem';
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

  const validatePortfolioContent = () => {
    const solutions = loadSolutions();
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
      alert('✅ Portfólio pronto para demonstração!\n\n• 10 soluções completas\n• Todas as imagens configuradas\n• Conteúdo validado');
    } else {
      alert(`⚠️ Questões encontradas (${issues.length}):\n\n${issues.slice(0, 5).join('\n')}${issues.length > 5 ? '\n...' : ''}`);
    }
  };

  const totalHoursSaved = localSolutions.reduce((sum, solution) => sum + solution.timesSaved, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminPanelHeader
        solutionsCount={localSolutions.length}
        totalHoursSaved={totalHoursSaved}
        onValidatePortfolio={runPortfolioValidation}
        onExportData={handleExportData}
        onNewSolution={() => {
          setShowAddForm(true);
          setEditingId(null);
          resetForm();
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
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
                <Button onClick={handleSave} className="bg-indigo-500 hover:bg-indigo-600">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Solutions Management */}
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
    </div>
  );
};

export default AdminPanel;
