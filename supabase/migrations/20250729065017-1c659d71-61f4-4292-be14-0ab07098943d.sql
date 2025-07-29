-- Criar tabela para imagens das soluções
CREATE TABLE IF NOT EXISTS public.solucao_imagens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  solucao_id UUID NOT NULL REFERENCES public.solucoes(id) ON DELETE CASCADE,
  imagem_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.solucao_imagens ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura pública
CREATE POLICY "Imagens das soluções são públicas para leitura" 
ON public.solucao_imagens 
FOR SELECT 
USING (true);

-- Políticas para admin
CREATE POLICY "Apenas admin pode modificar imagens das soluções" 
ON public.solucao_imagens 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.email = auth.email()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.email = auth.email()
));

-- Criar tabela para informações da empresa
CREATE TABLE IF NOT EXISTS public.empresa_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT,
  descricao TEXT,
  missao TEXT,
  visao TEXT,
  historia TEXT,
  fundacao_ano INTEGER,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na empresa_info
ALTER TABLE public.empresa_info ENABLE ROW LEVEL SECURITY;

-- Políticas para empresa_info
CREATE POLICY "Informações da empresa são públicas para leitura" 
ON public.empresa_info 
FOR SELECT 
USING (true);

CREATE POLICY "Apenas admin pode modificar informações da empresa" 
ON public.empresa_info 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.email = auth.email()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.email = auth.email()
));

-- Criar tabela para contactos da empresa
CREATE TABLE IF NOT EXISTS public.empresa_contactos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telefone TEXT,
  email_geral TEXT,
  email_parcerias TEXT,
  endereco TEXT,
  linkedin_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS na empresa_contactos
ALTER TABLE public.empresa_contactos ENABLE ROW LEVEL SECURITY;

-- Políticas para empresa_contactos
CREATE POLICY "Contactos da empresa são públicos para leitura" 
ON public.empresa_contactos 
FOR SELECT 
USING (true);

CREATE POLICY "Apenas admin pode modificar contactos da empresa" 
ON public.empresa_contactos 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.email = auth.email()
))
WITH CHECK (EXISTS (
  SELECT 1 FROM admin_users 
  WHERE admin_users.email = auth.email()
));

-- Trigger para atualizar updated_at automaticamente
CREATE TRIGGER update_empresa_info_updated_at
  BEFORE UPDATE ON public.empresa_info
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_empresa_contactos_updated_at
  BEFORE UPDATE ON public.empresa_contactos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir dados iniciais se não existirem
INSERT INTO public.empresa_info (nome, descricao, missao, visao) 
SELECT 'DrakoYuda Soluções', 'Pessoas como nós, fazem coisas assim.', 'Nossa missão', 'Nossa visão'
WHERE NOT EXISTS (SELECT 1 FROM public.empresa_info);

INSERT INTO public.empresa_contactos (email_geral, email_parcerias) 
SELECT 'geral@drakoyuda.com', 'parcerias@drakoyuda.com'
WHERE NOT EXISTS (SELECT 1 FROM public.empresa_contactos);