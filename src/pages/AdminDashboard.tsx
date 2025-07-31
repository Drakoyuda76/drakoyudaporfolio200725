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
  Eye,
  Mail,
  Edit,
  Trash2,
  Upload,
  Search,
  Shield,
  Download,
  FileText,
  Save,
  X
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

interface AdminUser {
  id: string;
  email: string;
  name: string;
  created_at: string;
  last_login: string | null;
}

interface AppUser {
  id: string;
  username: string;
  email: string;
  created_at: string;
  last_login: string | null;
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
  // Estados para gestão unificada de utilizadores
  const [userType, setUserType] = useState<'admin' | 'user'>('admin');
  const [userName, setUserName] = useState('');
  const [userUsername, setUserUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [editingUser, setEditingUser] = useState<any>(null);
  
  // Estados existentes
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);
  const [newUserUsername, setNewUserUsername] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Verificar autenticação
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
        return;
      }
      setUser(session.user);
      loadDashboardData();
    });

    // Listener para mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
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
        .limit(1)
        .single();

      if (estatisticasError && estatisticasError.code !== 'PGRST116') {
        console.error('Erro ao carregar estatísticas:', estatisticasError);
      }
      setEstatisticas(estatisticasData);

      // Carregar valores da empresa
      const { data: valoresData, error: valoresError } = await supabase
        .from('valores_empresa')
        .select('*')
        .limit(1)
        .single();

      if (valoresError && valoresError.code !== 'PGRST116') {
        console.error('Erro ao carregar valores da empresa:', valoresError);
      }
      setValoresEmpresa(valoresData);

      // Carregar contacto
      const { data: contactoData, error: contactoError } = await supabase
        .from('empresa_contactos')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (contactoError && contactoError.code !== 'PGRST116') {
        console.error('Erro ao carregar contacto:', contactoError);
      }
      setContacto(contactoData?.[0]);

      // Carregar usuários admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (adminError) {
        console.error('Erro ao carregar admin users:', adminError);
      }
      setAdminUsers(adminData || []);

      // Carregar usuários app
      const { data: appUsersData, error: appUsersError } = await supabase
        .from('app_users')
        .select('*')
        .order('created_at', { ascending: false });

      if (appUsersError) {
        console.error('Erro ao carregar app users:', appUsersError);
      }
      setAppUsers(appUsersData || []);

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
      if ((contacto as any).id) {
        const { error } = await supabase
          .from('empresa_contactos')
          .update(contacto)
          .eq('id', (contacto as any).id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('empresa_contactos')
          .insert(contacto);
        if (error) throw error;
      }

      toast({
        title: "Contactos atualizados",
        description: "As informações de contacto foram atualizadas com sucesso.",
      });
      
      await loadDashboardData();
    } catch (error) {
      console.error('Erro ao atualizar contacto:', error);
      toast({
        title: "Erro",
        description: "Erro ao atualizar contactos.",
        variant: "destructive",
      });
    }
  };

  // Funções para gestão unificada de utilizadores
  const handleSaveUser = async () => {
    if (userType === 'admin') {
      // Lógica para administrador usando as variáveis unificadas
      const nameValue = userName || newAdminName;
      const emailValue = userEmail || newAdminEmail;
      const passwordValue = userPassword || newAdminPassword;
      
      if (!nameValue || !emailValue || (!editingUser && !passwordValue)) {
        toast({
          title: "Erro",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      if (editingUser) {
        // Atualizar admin existente
        const updates: any = { name: nameValue, email: emailValue };
        if (passwordValue) {
          updates.password_hash = passwordValue; // Simplified - in real app, hash the password
        }

        const { error } = await supabase
          .from('admin_users')
          .update(updates)
          .eq('id', editingUser.id);

        if (error) {
          toast({
            title: "Erro",
            description: "Erro ao atualizar administrador.",
            variant: "destructive",
          });
          return;
        }
      } else {
        // Usar a função existente mas com os valores unificados
        setNewAdminName(nameValue);
        setNewAdminEmail(emailValue);
        setNewAdminPassword(passwordValue);
        await handleAddAdmin();
      }
    } else {
      // Lógica para utilizador usando as variáveis unificadas
      const usernameValue = userUsername || newUserUsername;
      const emailValue = userEmail || newUserEmail;
      const passwordValue = userPassword || newUserPassword;
      
      if (!usernameValue || !emailValue || (!editingUser && !passwordValue)) {
        toast({
          title: "Erro",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }

      if (editingUser) {
        // Atualizar user existente
        const updates: any = { username: usernameValue, email: emailValue };
        if (passwordValue) {
          updates.password_hash = passwordValue; // Simplified - in real app, hash the password
        }

        const { error } = await supabase
          .from('app_users')
          .update(updates)
          .eq('id', editingUser.id);

        if (error) {
          toast({
            title: "Erro",
            description: "Erro ao atualizar utilizador.",
            variant: "destructive",
          });
          return;
        }
      } else {
        // Usar a função existente mas com os valores unificados
        setNewUserUsername(usernameValue);
        setNewUserEmail(emailValue);
        setNewUserPassword(passwordValue);
        await handleAddUser();
      }
    }

    // Limpar formulário e recarregar listas
    handleCancelEdit();
    await loadDashboardData();
  };

  const handleEditUser = (user: any, type: 'admin' | 'user') => {
    setEditingUser(user);
    setUserType(type);
    
    if (type === 'admin') {
      setUserName(user.name || '');
      setUserEmail(user.email || '');
      setUserUsername('');
    } else {
      setUserUsername(user.username || '');
      setUserEmail(user.email || '');
      setUserName('');
    }
    
    setUserPassword('');
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setUserName('');
    setUserUsername('');
    setUserEmail('');
    setUserPassword('');
    setUserType('admin');
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail || !newAdminPassword || !newAdminName) {
      toast({
        title: "Erro",
        description: "Nome, email e senha são obrigatórios.",
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
          name: newAdminName
        });

      if (error) throw error;

      toast({
        title: "Administrador adicionado",
        description: "Novo administrador foi adicionado com sucesso.",
      });

      setNewAdminEmail('');
      setNewAdminPassword('');
      setNewAdminName('');
      await loadDashboardData();
    } catch (error) {
      console.error('Erro ao adicionar administrador:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar administrador.",
        variant: "destructive",
      });
    }
  };

  const handleAddUser = async () => {
    if (!newUserUsername || !newUserEmail || !newUserPassword) {
      toast({
        title: "Erro",
        description: "Username, email e senha são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('app_users')
        .insert({
          username: newUserUsername,
          email: newUserEmail,
          password_hash: newUserPassword
        });

      if (error) throw error;

      toast({
        title: "Usuário adicionado",
        description: "Novo usuário foi adicionado com sucesso.",
      });

      setNewUserUsername('');
      setNewUserEmail('');
      setNewUserPassword('');
      await loadDashboardData();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
      toast({
        title: "Erro",
        description: "Erro ao adicionar usuário.",
        variant: "destructive",
      });
    }
  };

  // Funções de Export/Import
  const exportSolutions = () => {
    const exportData = solucoes.map(solution => ({
      title: solution.title,
      subtitle: solution.subtitle,
      description: solution.description,
      problem_solution: solution.problem_solution,
      business_area_impact: solution.business_area_impact,
      sdg_goals: solution.sdg_goals,
      times_saved: solution.times_saved,
      users_impacted: solution.users_impacted,
      status: solution.status,
      sustainability_impact: solution.sustainability_impact,
      human_impact: solution.human_impact
    }));
    
    downloadJSON(exportData, `solucoes_${new Date().toISOString().split('T')[0]}.json`);
  };

  const exportStatistics = () => {
    if (!estatisticas) return;
    const exportData = {
      total_solucoes: estatisticas.total_solucoes,
      solucoes_ativas: estatisticas.solucoes_ativas,
      parcerias_ativas: estatisticas.parcerias_ativas,
      total_horas_poupadas: estatisticas.total_horas_poupadas,
      total_utilizadores_impactados: estatisticas.total_utilizadores_impactados
    };
    
    downloadJSON(exportData, `estatisticas_${new Date().toISOString().split('T')[0]}.json`);
  };

  const exportCompanyInfo = () => {
    if (!valoresEmpresa) return;
    downloadJSON(valoresEmpresa, `empresa_${new Date().toISOString().split('T')[0]}.json`);
  };

  const exportContacts = () => {
    if (!contacto) return;
    downloadJSON(contacto, `contactos_${new Date().toISOString().split('T')[0]}.json`);
  };

  const exportUsers = () => {
    const exportData = {
      admin_users: adminUsers.map(user => ({
        name: user.name,
        email: user.email
      })),
      app_users: appUsers.map(user => ({
        username: user.username,
        email: user.email
      }))
    };
    
    downloadJSON(exportData, `usuarios_${new Date().toISOString().split('T')[0]}.json`);
  };

  const downloadJSON = (data: any, filename: string) => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', filename);
    linkElement.click();
    
    toast({
      title: "Sucesso!",
      description: "Dados exportados com sucesso.",
    });
  };

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importData = JSON.parse(text);
      
      if (type === 'solutions') {
        await importSolutionsToForm(importData);
      } else if (type === 'statistics') {
        await importStatisticsToForm(importData);
      } else if (type === 'company') {
        await importCompanyInfoToForm(importData);
      } else if (type === 'contacts') {
        await importContactsToForm(importData);
      } else if (type === 'users') {
        await importUsersToForm(importData);
      }
      
      event.target.value = '';
    } catch (error) {
      console.error('Erro ao importar:', error);
      toast({
        title: "Erro",
        description: "Erro ao importar dados. Verifique o formato do arquivo.",
        variant: "destructive",
      });
    }
  };

  // NOVAS FUNÇÕES: Importar dados diretamente nos formulários (PRÉ-PREENCHIMENTO)
  const importSolutionsToForm = async (data: any[]) => {
    if (!Array.isArray(data) || data.length === 0) throw new Error('Formato inválido');
    
    // Pegar primeira solução dos dados importados e pré-preencher no formulário de nova solução
    const firstSolution = data[0];
    
    // Remover campos de imagem/ícone como solicitado
    const cleanSolution = {
      ...firstSolution,
      icon_url: null,
      images_urls: []
    };
    
    // Navegar para aba de nova solução e pré-preencher
    setActiveTab('nova-solucao');
    setEditingSolution(cleanSolution as any);
    setShowSolutionForm(true);
    
    toast({
      title: "Sucesso!",
      description: "Dados importados no formulário. Revise e salve.",
    });
  };

  const importStatisticsToForm = async (data: any) => {
    // Pré-preencher formulário de estatísticas
    const newStats = {
      total_solucoes: data.total_solucoes || 0,
      solucoes_ativas: data.solucoes_ativas || 0,
      parcerias_ativas: data.parcerias_ativas || 0,
      total_horas_poupadas: data.total_horas_poupadas || 0,
      total_utilizadores_impactados: data.total_utilizadores_impactados || 0
    };
    
    setEstatisticas(prev => ({ ...prev, ...newStats } as any));
    setActiveTab('dashboard');
    
    toast({
      title: "Sucesso!",
      description: "Estatísticas pré-preenchidas no formulário.",
    });
  };

  const importCompanyInfoToForm = async (data: any) => {
    // Pré-preencher formulário de empresa
    const newCompanyInfo = {
      missao: data.missao || '',
      visao: data.visao || '',
      valores: data.valores || [],
      fundacao_ano: data.fundacao_ano || 0,
      historia: data.historia || ''
    };
    
    setValoresEmpresa(prev => ({ ...prev, ...newCompanyInfo } as any));
    setActiveTab('empresa');
    
    toast({
      title: "Sucesso!",
      description: "Informações da empresa pré-preenchidas no formulário.",
    });
  };

  const importContactsToForm = async (data: any) => {
    // Pré-preencher formulário de contactos
    const newContacts = {
      email_geral: data.email_geral || '',
      email_parcerias: data.email_parcerias || '',
      telefone: data.telefone || '',
      endereco: data.endereco || '',
      linkedin_url: data.linkedin_url || ''
    };
    
    setContacto(prev => ({ ...prev, ...newContacts } as any));
    setActiveTab('contactos');
    
    toast({
      title: "Sucesso!",
      description: "Contactos pré-preenchidos no formulário.",
    });
  };

  const importUsersToForm = async (data: any) => {
    // Pré-preencher primeiro admin se existir
    if (data.admin_users && data.admin_users.length > 0) {
      const firstAdmin = data.admin_users[0];
      setNewAdminName(firstAdmin.name || '');
      setNewAdminEmail(firstAdmin.email || '');
      setNewAdminPassword(''); // Por segurança, deixar vazio
      setActiveTab('admins');
    }
    
    // Pré-preencher primeiro usuário app se existir
    if (data.app_users && data.app_users.length > 0) {
      const firstUser = data.app_users[0];
      setNewUserUsername(firstUser.username || '');
      setNewUserEmail(firstUser.email || '');
      setNewUserPassword(''); // Por segurança, deixar vazio
      
      if (!data.admin_users || data.admin_users.length === 0) {
        setActiveTab('usuarios');
      }
    }
    
    toast({
      title: "Sucesso!",
      description: "Dados de usuários pré-preenchidos nos formulários.",
    });
  };

  // FUNÇÕES ORIGINAIS: Importar e salvar diretamente na base de dados
  const importSolutions = async (data: any[]) => {
    if (!Array.isArray(data)) throw new Error('Formato inválido');
    
    for (const solutionData of data) {
      await supabase.from('solucoes').insert(solutionData);
    }
    
    toast({
      title: "Sucesso!",
      description: `${data.length} soluções importadas.`,
    });
    
    await loadDashboardData();
  };

  const importStatistics = async (data: any) => {
    if ((estatisticas as any)?.id) {
      await supabase.from('estatisticas').update(data).eq('id', (estatisticas as any).id);
    } else {
      await supabase.from('estatisticas').insert(data);
    }
    
    toast({
      title: "Sucesso!",
      description: "Estatísticas importadas.",
    });
    
    await loadDashboardData();
  };

  const importCompanyInfo = async (data: any) => {
    if ((valoresEmpresa as any)?.id) {
      await supabase.from('valores_empresa').update(data).eq('id', (valoresEmpresa as any).id);
    } else {
      await supabase.from('valores_empresa').insert(data);
    }
    
    toast({
      title: "Sucesso!",
      description: "Informações da empresa importadas.",
    });
    
    await loadDashboardData();
  };

  const importContacts = async (data: any) => {
    if ((contacto as any)?.id) {
      await supabase.from('empresa_contactos').update(data).eq('id', (contacto as any).id);
    } else {
      await supabase.from('empresa_contactos').insert(data);
    }
    
    toast({
      title: "Sucesso!",
      description: "Contactos importados.",
    });
    
    await loadDashboardData();
  };

  const importUsers = async (data: any) => {
    if (data.admin_users) {
      for (const adminData of data.admin_users) {
        await supabase.from('admin_users').insert({
          ...adminData,
          password_hash: 'temp123'
        });
      }
    }
    
    if (data.app_users) {
      for (const userData of data.app_users) {
        await supabase.from('app_users').insert({
          ...userData,
          password_hash: 'temp123'
        });
      }
    }
    
    toast({
      title: "Sucesso!",
      description: "Usuários importados.",
    });
    
    await loadDashboardData();
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
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => {
                // Marcar que admin está visualizando como visitante
                localStorage.setItem("isAdminViewingAsVisitor", "true");
                window.open('/', '_blank');
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              👁️ Ver como Visitante
            </Button>
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
            <TabsTrigger value="utilizadores">
              <Users className="h-4 w-4 mr-2" />
              Utilizadores
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Editar Estatísticas</CardTitle>
                  <CardDescription>
                    Atualizar métricas principais do dashboard
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={exportStatistics}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar JSON
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Importar JSON
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => handleImportFile(e, 'statistics')}
                      className="hidden"
                    />
                  </label>
                </div>
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
                <div className="flex gap-2">
                  <Button onClick={handleUpdateEstatisticas}>Atualizar Estatísticas</Button>
                </div>
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
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={exportSolutions}>
                      <Download className="w-4 h-4 mr-2" />
                      Exportar JSON
                    </Button>
                    <label className="cursor-pointer">
                      <Button variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Importar JSON
                        </span>
                      </Button>
                      <input
                        type="file"
                        accept=".json"
                        onChange={(e) => handleImportFile(e, 'solutions')}
                        className="hidden"
                      />
                    </label>
                    <Button onClick={() => setShowSolutionForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Nova Solução
                    </Button>
                  </div>
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Informações da Empresa</CardTitle>
                  <CardDescription>
                    Gerir missão, visão e valores da DrakoYuda
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={exportCompanyInfo}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar JSON
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Importar JSON
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => handleImportFile(e, 'company')}
                      className="hidden"
                    />
                  </label>
                </div>
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
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gestão de Contactos</CardTitle>
                  <CardDescription>
                    Atualizar informações de contacto e parcerias
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={exportContacts}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar JSON
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Importar JSON
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => handleImportFile(e, 'contacts')}
                      className="hidden"
                    />
                  </label>
                </div>
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

          {/* Gestão Unificada de Utilizadores */}
          <TabsContent value="utilizadores" className="space-y-6">
            {/* Botões de Importar/Exportar */}
            <Card>
              <CardHeader>
                <CardTitle>Gestão de Utilizadores</CardTitle>
                <CardDescription>
                  Gerir todos os utilizadores e administradores do sistema
                </CardDescription>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => exportUsers()}>
                    <Download className="w-4 h-4 mr-2" />
                    Exportar JSON
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="outline" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Importar JSON
                      </span>
                    </Button>
                    <input
                      type="file"
                      accept=".json"
                      onChange={(e) => handleImportFile(e, 'users')}
                      className="hidden"
                    />
                  </label>
                </div>
              </CardHeader>
            </Card>

            {/* Formulário Unificado para Adicionar/Editar Utilizador */}
            <Card>
              <CardHeader>
                <CardTitle>
                  {editingUser ? 'Editar Utilizador' : 'Adicionar Novo Utilizador'}
                </CardTitle>
                <CardDescription>
                  {editingUser ? 'Atualizar informações do utilizador' : 'Criar novo utilizador ou administrador'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  {/* Tipo de Utilizador */}
                  <div>
                    <Label>Tipo de Utilizador</Label>
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="userType"
                          value="admin"
                          checked={userType === 'admin'}
                          onChange={(e) => setUserType(e.target.value as 'admin' | 'user')}
                          className="form-radio"
                        />
                        <span className="text-sm">🛡️ Administrador</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="userType"
                          value="user"
                          checked={userType === 'user'}
                          onChange={(e) => setUserType(e.target.value as 'admin' | 'user')}
                          className="form-radio"
                        />
                        <span className="text-sm">👤 Utilizador</span>
                      </label>
                    </div>
                  </div>

                  {/* Campos do Formulário */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {userType === 'admin' ? (
                      <div>
                        <Label htmlFor="user_name">Nome Completo</Label>
                        <Input
                          id="user_name"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="Nome completo do administrador"
                        />
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="user_username">Username</Label>
                        <Input
                          id="user_username"
                          value={userUsername}
                          onChange={(e) => setUserUsername(e.target.value)}
                          placeholder="username único"
                        />
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="user_email">Email</Label>
                      <Input
                        id="user_email"
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder={userType === 'admin' ? 'admin@empresa.com' : 'user@email.com'}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="user_password">
                        {editingUser ? 'Nova Senha (opcional)' : 'Senha'}
                      </Label>
                      <Input
                        id="user_password"
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder={editingUser ? 'Deixe vazio para manter' : 'Senha forte'}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSaveUser} className="flex-1">
                    {editingUser ? (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Atualizar {userType === 'admin' ? 'Administrador' : 'Utilizador'}
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4 mr-2" />
                        Adicionar {userType === 'admin' ? 'Administrador' : 'Utilizador'}
                      </>
                    )}
                  </Button>
                  {editingUser && (
                    <Button onClick={handleCancelEdit} variant="outline">
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Lista Unificada de Utilizadores */}
            <Card>
              <CardHeader>
                <CardTitle>Todos os Utilizadores</CardTitle>
                <CardDescription>
                  Lista completa de administradores e utilizadores do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* Administradores */}
                  {adminUsers.map((admin) => (
                    <div key={`admin-${admin.id}`} className="flex items-center justify-between p-4 border rounded-lg bg-red-50 dark:bg-red-950/20 hover:bg-red-100 dark:hover:bg-red-950/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold">
                            🛡️
                          </div>
                          <div>
                            <p className="font-medium text-lg">{admin.name}</p>
                            <p className="text-sm text-muted-foreground">{admin.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Criado: {new Date(admin.created_at).toLocaleDateString('pt-PT')}
                              {admin.last_login && ` | Último acesso: ${new Date(admin.last_login).toLocaleDateString('pt-PT')}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">Administrador</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditUser(admin, 'admin')}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Utilizadores */}
                  {appUsers.map((user) => (
                    <div key={`user-${user.id}`} className="flex items-center justify-between p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20 hover:bg-blue-100 dark:hover:bg-blue-950/30 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                            👤
                          </div>
                          <div>
                            <p className="font-medium text-lg">@{user.username}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">
                              Criado: {new Date(user.created_at).toLocaleDateString('pt-PT')}
                              {user.last_login && ` | Último acesso: ${new Date(user.last_login).toLocaleDateString('pt-PT')}`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Utilizador</Badge>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditUser(user, 'user')}
                        >
                          <Edit className="h-3 w-3 mr-1" />
                          Editar
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Estado vazio */}
                  {adminUsers.length === 0 && appUsers.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">Nenhum utilizador encontrado</p>
                      <p className="text-sm text-muted-foreground">Comece por adicionar o primeiro utilizador</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}