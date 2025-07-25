-- Criar enum para status das soluções
CREATE TYPE solution_status AS ENUM (
  'live', 
  'parceria', 
  'prototipo', 
  'teste-usuarios', 
  'conceito', 
  'teste-convite'
);

-- Criar tabela principal de soluções
CREATE TABLE public.solucoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  status solution_status NOT NULL DEFAULT 'conceito',
  business_area_impact TEXT[] DEFAULT '{}',
  problem_solution TEXT,
  human_impact TEXT,
  sustainability_impact TEXT,
  sdg_goals INTEGER[] DEFAULT '{}',
  times_saved INTEGER DEFAULT 0,
  users_impacted INTEGER DEFAULT 0,
  icon_url TEXT,
  images_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de estatísticas
CREATE TABLE public.estatisticas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  total_horas_poupadas INTEGER DEFAULT 0,
  total_utilizadores_impactados INTEGER DEFAULT 0,
  total_solucoes INTEGER DEFAULT 0,
  solucoes_ativas INTEGER DEFAULT 0,
  parcerias_ativas INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de valores da empresa
CREATE TABLE public.valores_empresa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  missao TEXT,
  visao TEXT,
  valores TEXT[] DEFAULT '{}',
  fundacao_ano INTEGER,
  historia TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de contactos
CREATE TABLE public.contacto (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_geral TEXT,
  email_parcerias TEXT,
  telefone TEXT,
  endereco TEXT,
  linkedin_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de logs administrativos
CREATE TABLE public.admin_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  table_name TEXT,
  record_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Ativar RLS em todas as tabelas
ALTER TABLE public.solucoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estatisticas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.valores_empresa ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacto ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- Políticas RLS - Leitura pública para dados essenciais
CREATE POLICY "Soluções são públicas para leitura" 
ON public.solucoes 
FOR SELECT 
USING (true);

CREATE POLICY "Estatísticas são públicas para leitura" 
ON public.estatisticas 
FOR SELECT 
USING (true);

CREATE POLICY "Valores da empresa são públicos para leitura" 
ON public.valores_empresa 
FOR SELECT 
USING (true);

CREATE POLICY "Contactos são públicos para leitura" 
ON public.contacto 
FOR SELECT 
USING (true);

-- Políticas RLS - Apenas admin pode modificar
CREATE POLICY "Apenas admin pode modificar soluções" 
ON public.solucoes 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = auth.email()
));

CREATE POLICY "Apenas admin pode modificar estatísticas" 
ON public.estatisticas 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = auth.email()
));

CREATE POLICY "Apenas admin pode modificar valores da empresa" 
ON public.valores_empresa 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = auth.email()
));

CREATE POLICY "Apenas admin pode modificar contactos" 
ON public.contacto 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = auth.email()
));

CREATE POLICY "Apenas admin pode ver e criar logs" 
ON public.admin_logs 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.admin_users 
  WHERE email = auth.email()
));

-- Função para atualizar timestamp automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER update_solucoes_updated_at
  BEFORE UPDATE ON public.solucoes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_estatisticas_updated_at
  BEFORE UPDATE ON public.estatisticas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_valores_empresa_updated_at
  BEFORE UPDATE ON public.valores_empresa
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_contacto_updated_at
  BEFORE UPDATE ON public.contacto
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Criar bucket de storage para imagens
INSERT INTO storage.buckets (id, name, public) VALUES ('drakoyuda-images', 'drakoyuda-images', true);

-- Políticas de storage
CREATE POLICY "Imagens são públicas para visualização" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'drakoyuda-images');

CREATE POLICY "Apenas admin pode fazer upload de imagens" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'drakoyuda-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.email()
  )
);

CREATE POLICY "Apenas admin pode deletar imagens" 
ON storage.objects 
FOR DELETE 
USING (
  bucket_id = 'drakoyuda-images' 
  AND EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE email = auth.email()
  )
);