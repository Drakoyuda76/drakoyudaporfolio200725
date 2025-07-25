import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
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
  Upload
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

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

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [solucoes, setSolucoes] = useState<Solucao[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
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
          <TabsList className="grid w-full grid-cols-5">
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
                <CardTitle>Todas as Soluções</CardTitle>
                <CardDescription>
                  Gerir o portfólio completo de soluções DrakoYuda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {solucoes.map((solucao) => (
                    <div key={solucao.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{solucao.title}</h3>
                          <Badge variant="secondary" className={`${getStatusColor(solucao.status)} text-white`}>
                            {getStatusLabel(solucao.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{solucao.subtitle}</p>
                        <div className="flex gap-4 text-xs text-muted-foreground">
                          <span>{solucao.times_saved}h poupadas</span>
                          <span>{solucao.users_impacted} utilizadores</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Formulário de criação em desenvolvimento...</p>
                </div>
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
              <CardContent>
                <div className="text-center py-8">
                  <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Gestão de informações empresariais em desenvolvimento...</p>
                </div>
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
              <CardContent>
                <div className="text-center py-8">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Gestão de contactos em desenvolvimento...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}