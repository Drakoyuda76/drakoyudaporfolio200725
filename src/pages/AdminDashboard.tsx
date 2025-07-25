import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  BarChart3, 
  Plus, 
  Settings, 
  LogOut, 
  Users, 
  Clock, 
  Target,
  TrendingUp,
  Building,
  Mail,
  Edit,
  Trash2,
  Upload,
  Search,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import SolutionForm from '@/components/admin/SolutionForm';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Solucao {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  business_area_impact: string[];
  problem_solution: string;
  human_impact: string;
  sustainability_impact: string;
  sdg_goals: number[];
  times_saved: number;
  users_impacted: number;
  icon_url: string | null;
  images_urls: string[];
  created_at: string;
  updated_at: string;
}

interface Estatisticas {
  total_horas_poupadas: number;
  total_utilizadores_impactados: number;
  total_solucoes: number;
  solucoes_ativas: number;
  parcerias_ativas: number;
}

interface ValoresEmpresa {
  missao: string;
  visao: string;
  valores: string[];
  fundacao_ano: number;
  historia: string;
}

interface Contacto {
  email_geral: string;
  email_parcerias: string;
  telefone: string;
  endereco: string;
  linkedin_url: string;
}

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [solucoes, setSolucoes] = useState<Solucao[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [valoresEmpresa, setValoresEmpresa] = useState<ValoresEmpresa | null>(null);
  const [contacto, setContacto] = useState<Contacto | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSolutionForm, setShowSolutionForm] = useState(false);
  const [editingSolution, setEditingSolution] = useState<Solucao | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar autenticação
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session || session.user.email !== 'drakoyuda76@gmail.com') {
        navigate('/login');
        return;
      }
      setUser(session.user);
      loadDashboardData();
    });

    // Listener para mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session || session.user.email !== 'drakoyuda76@gmail.com') {
        navigate('/login');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Carregar soluções
      const { data: solucoesData, error: solucoesError } = await supabase
        .from('solucoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (solucoesError) throw solucoesError;
      setSolucoes(solucoesData || []);

      // Carregar estatísticas
      const { data: estatisticasData, error: estatisticasError } = await supabase
        .from('estatisticas')
        .select('*')
        .single();

      if (estatisticasError) throw estatisticasError;
      setEstatisticas(estatisticasData);

      // Carregar valores da empresa
      const { data: valoresData, error: valoresError } = await supabase
        .from('valores_empresa')
        .select('*')
        .single();

      if (valoresError) throw valoresError;
      setValoresEmpresa(valoresData);

      // Carregar contacto
      const { data: contactoData, error: contactoError } = await supabase
        .from('contacto')
        .select('*')
        .single();

      if (contactoError) throw contactoError;
      setContacto(contactoData);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do dashboard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
    toast({
      title: "Sessão terminada",
      description: "Até breve!",
    });
  };

  const handleEditSolution = (solution: Solucao) => {
    setEditingSolution(solution);
    setShowSolutionForm(true);
  };

  const handleDeleteSolution = async (solutionId: string) => {
    try {
      const { error } = await supabase
        .from('solucoes')
        .delete()
        .eq('id', solutionId);

      if (error) throw error;

      toast({
        title: "Solução eliminada",
        description: "A solução foi eliminada com sucesso.",
      });

      loadDashboardData();
    } catch (error) {
      console.error('Erro ao eliminar solução:', error);
      toast({
        title: "Erro",
        description: "Erro ao eliminar a solução.",
        variant: "destructive",
      });
    }
  };

  const handleSaveSolution = () => {
    setShowSolutionForm(false);
    setEditingSolution(null);
    loadDashboardData();
  };

  const handleUpdateEstatisticas = async () => {
    if (!estatisticas) return;

    try {
      const { error } = await supabase
        .from('estatisticas')
        .update(estatisticas)
        .eq('id', (estatisticas as any).id);

      if (error) throw error;

      toast({
        title: "Estatísticas atualizadas",
        description: "As estatísticas foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao atualizar estatísticas:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar estatísticas.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateValoresEmpresa = async () => {
    if (!valoresEmpresa) return;

    try {
      const { error } = await supabase
        .from('valores_empresa')
        .update(valoresEmpresa)
        .eq('id', (valoresEmpresa as any).id);

      if (error) throw error;

      toast({
        title: "Informações da empresa atualizadas",
        description: "As informações da empresa foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao atualizar valores da empresa:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar informações da empresa.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateContacto = async () => {
    if (!contacto) return;

    try {
      const { error } = await supabase
        .from('contacto')
        .update(contacto)
        .eq('id', (contacto as any).id);

      if (error) throw error;

      toast({
        title: "Contactos atualizados",
        description: "As informações de contacto foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error('Erro ao atualizar contacto:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar contactos.",
        variant: "destructive",
      });
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword) {
      toast({
        title: "Erro",
        description: "Email e senha são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('admin_users')
        .insert({
          email: newAdminEmail,
          password_hash: newAdminPassword,
          name: 'Administrador'
        });

      if (error) throw error;

      toast({
        title: "Administrador adicionado",
        description: "Novo administrador foi adicionado com sucesso.",
      });

      setNewAdminEmail('');
      setNewAdminPassword('');
    } catch (error) {
      console.error('Erro ao adicionar administrador:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar administrador.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'live': 'bg-green-500',
      'parceria': 'bg-blue-500',
      'prototipo': 'bg-orange-500',
      'teste-usuarios': 'bg-purple-500',
      'teste-convite': 'bg-yellow-500',
      'conceito': 'bg-gray-500',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusLabel = (status: string) => {
    const labels = {
      'live': 'Live',
      'parceria': 'Parceria',
      'prototipo': 'Protótipo',
      'teste-usuarios': 'Teste Utilizadores',
      'teste-convite': 'Teste Convite',
      'conceito': 'Conceito',
    };
    return labels[status as keyof typeof labels] || status;
  };

  const filteredSolutions = solucoes.filter(solution =>
    solution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solution.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>A carregar painel administrativo...</p>
        </div>
      </div>
    );
  }

  if (showSolutionForm) {
    return (
      <div className="min-h-screen bg-background p-6">
        <SolutionForm
          solution={editingSolution}
          onSave={handleSaveSolution}
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
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
            <p className="text-sm text-muted-foreground">DrakoYuda Soluções</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">Bem-vindo, {user?.email}</span>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">
              <BarChart3 className="h-4 w-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="solucoes">
              <Target className="h-4 w-4 mr-2" />
              Soluções
            </TabsTrigger>
            <TabsTrigger value="nova-solucao">
              <Plus className="h-4 w-4 mr-2" />
              Nova Solução
            </TabsTrigger>
            <TabsTrigger value="empresa">
              <Building className="h-4 w-4 mr-2" />
              Empresa
            </TabsTrigger>
            <TabsTrigger value="contactos">
              <Mail className="h-4 w-4 mr-2" />
              Contactos
            </TabsTrigger>
            <TabsTrigger value="admins">
              <Shield className="h-4 w-4 mr-2" />
              Admins
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Soluções</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estatisticas?.total_solucoes || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {estatisticas?.solucoes_ativas || 0} ativas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Horas Poupadas</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estatisticas?.total_horas_poupadas?.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Tempo economizado total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilizadores Impactados</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estatisticas?.total_utilizadores_impactados?.toLocaleString() || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Pessoas beneficiadas
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Parcerias Ativas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{estatisticas?.parcerias_ativas || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Colaborações em curso
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Editar Estatísticas */}
            <Card>
              <CardHeader>
                <CardTitle>Editar Estatísticas</CardTitle>
                <CardDescription>
                  Atualizar métricas principais do dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <Label>Total Soluções</Label>
                    <Input
                      type="number"
                      value={estatisticas?.total_solucoes || 0}
                      onChange={(e) => setEstatisticas(prev => prev ? { ...prev, total_solucoes: parseInt(e.target.value) || 0 } : null)}
                    />
                  </div>
                  <div>
                    <Label>Horas Poupadas</Label>
                    <Input
                      type="number"
                      value={estatisticas?.total_horas_poupadas || 0}
                      onChange={(e) => setEstatisticas(prev => prev ? { ...prev, total_horas_poupadas: parseInt(e.target.value) || 0 } : null)}
                    />
                  </div>
                  <div>
                    <Label>Utilizadores Impactados</Label>
                    <Input
                      type="number"
                      value={estatisticas?.total_utilizadores_impactados || 0}
                      onChange={(e) => setEstatisticas(prev => prev ? { ...prev, total_utilizadores_impactados: parseInt(e.target.value) || 0 } : null)}
                    />
                  </div>
                  <div>
                    <Label>Parcerias Ativas</Label>
                    <Input
                      type="number"
                      value={estatisticas?.parcerias_ativas || 0}
                      onChange={(e) => setEstatisticas(prev => prev ? { ...prev, parcerias_ativas: parseInt(e.target.value) || 0 } : null)}
                    />
                  </div>
                </div>
                <Button onClick={handleUpdateEstatisticas}>Atualizar Estatísticas</Button>
              </CardContent>
            </Card>

            {/* Gráfico de status das soluções */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Status</CardTitle>
                <CardDescription>
                  Estado atual das soluções no portfólio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(
                    solucoes.reduce((acc, solucao) => {
                      acc[solucao.status] = (acc[solucao.status] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([status, count]) => (
                    <div key={status} className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`} />
                      <span className="text-sm">{getStatusLabel(status)}: {count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Lista de Soluções */}
          <TabsContent value="solucoes" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Todas as Soluções</CardTitle>
                    <CardDescription>
                      Gerir o portfólio completo de soluções DrakoYuda
                    </CardDescription>
                  </div>
                  <Button onClick={() => setShowSolutionForm(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Solução
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Pesquisar soluções..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredSolutions.map((solucao) => (
                    <Card key={solucao.id} className="relative">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <CardTitle className="text-lg">{solucao.title}</CardTitle>
                              <Badge variant="secondary" className={`${getStatusColor(solucao.status)} text-white`}>
                                {getStatusLabel(solucao.status)}
                              </Badge>
                            </div>
                            <CardDescription>{solucao.subtitle}</CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditSolution(solucao)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Eliminar Solução</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Tem certeza que deseja eliminar a solução "{solucao.title}"? Esta ação não pode ser desfeita.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => handleDeleteSolution(solucao.id)}>
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{solucao.description}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {solucao.times_saved}h poupadas
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {solucao.users_impacted} utilizadores
                          </span>
                        </div>
                        {solucao.icon_url && (
                          <div className="mt-4">
                            <img src={solucao.icon_url} alt="Ícone" className="w-16 h-16 object-cover rounded" />
                          </div>
                        )}
                        {solucao.images_urls.length > 0 && (
                          <div className="grid grid-cols-4 gap-2 mt-4">
                            {solucao.images_urls.slice(0, 4).map((url, index) => (
                              <img key={index} src={url} alt={`Imagem ${index + 1}`} className="w-full h-12 object-cover rounded" />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Nova Solução */}
          <TabsContent value="nova-solucao">
            <Card>
              <CardHeader>
                <CardTitle>Criar Nova Solução</CardTitle>
                <CardDescription>
                  Adicionar uma nova solução ao portfólio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => setShowSolutionForm(true)} size="lg" className="w-full">
                  <Plus className="h-6 w-6 mr-2" />
                  Criar Nova Solução
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Empresa */}
          <TabsContent value="empresa">
            <Card>
              <CardHeader>
                <CardTitle>Informações da Empresa</CardTitle>
                <CardDescription>
                  Gerir missão, visão e valores da DrakoYuda
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="missao">Missão</Label>
                  <Textarea
                    id="missao"
                    value={valoresEmpresa?.missao || ''}
                    onChange={(e) => setValoresEmpresa(prev => prev ? { ...prev, missao: e.target.value } : null)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="visao">Visão</Label>
                  <Textarea
                    id="visao"
                    value={valoresEmpresa?.visao || ''}
                    onChange={(e) => setValoresEmpresa(prev => prev ? { ...prev, visao: e.target.value } : null)}
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="historia">História</Label>
                  <Textarea
                    id="historia"
                    value={valoresEmpresa?.historia || ''}
                    onChange={(e) => setValoresEmpresa(prev => prev ? { ...prev, historia: e.target.value } : null)}
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="fundacao_ano">Ano de Fundação</Label>
                  <Input
                    id="fundacao_ano"
                    type="number"
                    value={valoresEmpresa?.fundacao_ano || 2024}
                    onChange={(e) => setValoresEmpresa(prev => prev ? { ...prev, fundacao_ano: parseInt(e.target.value) || 2024 } : null)}
                  />
                </div>
                <div>
                  <Label>Valores Fundamentais</Label>
                  <div className="space-y-2 mt-2">
                    {valoresEmpresa?.valores?.map((valor, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={valor}
                          onChange={(e) => {
                            const newValores = [...(valoresEmpresa?.valores || [])];
                            newValores[index] = e.target.value;
                            setValoresEmpresa(prev => prev ? { ...prev, valores: newValores } : null);
                          }}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newValores = valoresEmpresa?.valores?.filter((_, i) => i !== index) || [];
                            setValoresEmpresa(prev => prev ? { ...prev, valores: newValores } : null);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => {
                        const newValores = [...(valoresEmpresa?.valores || []), ''];
                        setValoresEmpresa(prev => prev ? { ...prev, valores: newValores } : null);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Valor
                    </Button>
                  </div>
                </div>
                <Button onClick={handleUpdateValoresEmpresa}>Atualizar Informações da Empresa</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contactos */}
          <TabsContent value="contactos">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Contactos</CardTitle>
                <CardDescription>
                  Atualizar informações de contacto e parcerias
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email_geral">Email Geral</Label>
                    <Input
                      id="email_geral"
                      type="email"
                      value={contacto?.email_geral || ''}
                      onChange={(e) => setContacto(prev => prev ? { ...prev, email_geral: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email_parcerias">Email Parcerias</Label>
                    <Input
                      id="email_parcerias"
                      type="email"
                      value={contacto?.email_parcerias || ''}
                      onChange={(e) => setContacto(prev => prev ? { ...prev, email_parcerias: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={contacto?.telefone || ''}
                      onChange={(e) => setContacto(prev => prev ? { ...prev, telefone: e.target.value } : null)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                      id="endereco"
                      value={contacto?.endereco || ''}
                      onChange={(e) => setContacto(prev => prev ? { ...prev, endereco: e.target.value } : null)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                    <Input
                      id="linkedin_url"
                      value={contacto?.linkedin_url || ''}
                      onChange={(e) => setContacto(prev => prev ? { ...prev, linkedin_url: e.target.value } : null)}
                    />
                  </div>
                </div>
                <Button onClick={handleUpdateContacto}>Atualizar Contactos</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestão de Admins */}
          <TabsContent value="admins">
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Administradores</CardTitle>
                <CardDescription>
                  Adicionar novos administradores ao sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="new_admin_email">Email do Novo Admin</Label>
                    <Input
                      id="new_admin_email"
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      placeholder="admin@drakoyuda.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new_admin_password">Senha</Label>
                    <Input
                      id="new_admin_password"
                      type="password"
                      value={newAdminPassword}
                      onChange={(e) => setNewAdminPassword(e.target.value)}
                      placeholder="Senha forte"
                    />
                  </div>
                </div>
                <Button onClick={handleAddAdmin}>
                  <Shield className="h-4 w-4 mr-2" />
                  Adicionar Administrador
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}