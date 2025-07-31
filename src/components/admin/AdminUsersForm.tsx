import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2, Plus, Edit, Trash2, Users } from 'lucide-react';
import ImportExportButtons from './ImportExportButtons';

interface AdminUser {
  id?: string;
  name: string;
  email: string;
  created_at?: string;
  last_login?: string;
}

const AdminUsersForm = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [formData, setFormData] = useState<AdminUser & { password?: string }>({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setInitialLoad(true);
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, name, email, created_at, last_login')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading admin users:', error);
        return;
      }

      setUsers(data || []);
    } catch (error) {
      console.error('Error loading admin users:', error);
    } finally {
      setInitialLoad(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingUser?.id) {
        // Update existing user
        const updateData: any = {
          name: formData.name,
          email: formData.email
        };

        if (formData.password) {
          updateData.password_hash = formData.password;
        }

        const { error } = await supabase
          .from('admin_users')
          .update(updateData)
          .eq('id', editingUser.id);

        if (error) throw error;
        
        toast({
          title: "Sucesso!",
          description: "Administrador atualizado com sucesso.",
        });
      } else {
        // Create new user
        const { error } = await supabase
          .from('admin_users')
          .insert({
            name: formData.name,
            email: formData.email,
            password_hash: formData.password
          });

        if (error) throw error;

        toast({
          title: "Sucesso!",
          description: "Administrador criado com sucesso.",
        });
      }

      setShowForm(false);
      setEditingUser(null);
      setFormData({ name: '', email: '', password: '' });
      await loadUsers();
    } catch (error) {
      console.error('Error saving admin user:', error);
      toast({
        title: "Erro",
        description: "Erro ao salvar administrador. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este administrador?')) return;

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Administrador excluído com sucesso.",
      });

      await loadUsers();
    } catch (error) {
      console.error('Error deleting admin user:', error);
      toast({
        title: "Erro",
        description: "Erro ao excluir administrador. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const exportData = () => {
    const exportData = users.map(user => ({
      name: user.name,
      email: user.email,
      exported_at: new Date().toISOString()
    }));
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `admin_users_${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast({
      title: "Sucesso!",
      description: "Administradores exportados com sucesso.",
    });
  };

  const importData = async (data: any) => {
    try {
      if (!Array.isArray(data)) {
        throw new Error('Formato de arquivo inválido. Esperado um array de administradores.');
      }

      for (const userData of data) {
        await supabase
          .from('admin_users')
          .insert({
            name: userData.name,
            email: userData.email,
            password_hash: 'default_password_change_me'
          });
      }

      toast({
        title: "Sucesso!",
        description: `${data.length} administradores importados com sucesso. Lembre-se de alterar as senhas.`,
      });

      await loadUsers();
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
          <CardTitle>Gestão de Administradores</CardTitle>
          <CardDescription>
            Gerir administradores do sistema
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <ImportExportButtons
            onExport={exportData}
            onImport={importData}
            exportFilename="admin_users"
          />
          <Dialog open={showForm} onOpenChange={setShowForm}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  setEditingUser(null);
                  setFormData({ name: '', email: '', password: '' });
                }}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Novo Administrador
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {editingUser ? 'Editar Administrador' : 'Novo Administrador'}
                </DialogTitle>
                <DialogDescription>
                  {editingUser ? 'Edite as informações do administrador.' : 'Adicione um novo administrador ao sistema.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">
                    {editingUser ? 'Nova Senha (deixe vazio para manter)' : 'Senha'}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required={!editingUser}
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading}>
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingUser ? 'Salvar' : 'Criar'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowForm(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-center py-8">
            <Users className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhum administrador</h3>
            <p className="mt-1 text-sm text-muted-foreground">Comece criando um novo administrador.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Criado: {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</span>
                    <span>Último login: {user.last_login ? new Date(user.last_login).toLocaleDateString() : 'Nunca'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(user.id!)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminUsersForm;