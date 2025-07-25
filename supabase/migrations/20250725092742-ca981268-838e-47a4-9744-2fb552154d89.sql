-- Fix database function security issues by setting proper search_path
-- This addresses the 31 mutable search_path warnings

-- Update existing functions with SECURITY DEFINER and proper search_path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_settings_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_user_chatbot_settings_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.update_chatbot_customizations_timestamp()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.verificar_login(email_input text, senha_input text)
RETURNS TABLE(sucesso boolean, usuario_id uuid, email text, nome text, tipo_usuario text, mensagem text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $function$
DECLARE
  usuario_record RECORD;
BEGIN
  -- Buscar usuário pelo email
  SELECT * INTO usuario_record 
  FROM public.login2 
  WHERE login2.email = email_input;
  
  -- Verificar se usuário existe
  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::TEXT, 'Usuário não encontrado na tabela login2';
    RETURN;
  END IF;
  
  -- Verificar senha
  IF usuario_record.senha = crypt(senha_input, usuario_record.senha) THEN
    RETURN QUERY SELECT true, usuario_record.id, usuario_record.email, usuario_record.nome, usuario_record.tipo_usuario, 'Login realizado com sucesso';
  ELSE
    RETURN QUERY SELECT false, NULL::UUID, NULL::TEXT, NULL::TEXT, NULL::TEXT, 'Senha incorreta para o usuário ' || email_input;
  END IF;
END;
$function$;

-- Create admin users table with proper RLS
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true
);

-- Enable RLS on admin_users
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Admin users policies
CREATE POLICY "Admins can view admin users" ON public.admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

CREATE POLICY "Admins can insert admin users" ON public.admin_users
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

-- Create solutions table to replace hardcoded data
CREATE TABLE IF NOT EXISTS public.solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  problem_solution TEXT,
  human_impact TEXT,
  sustainability_impact TEXT,
  business_area_impact TEXT[] DEFAULT '{}',
  sdg_goals INTEGER[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  times_saved TEXT,
  users_impacted TEXT,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on solutions
ALTER TABLE public.solutions ENABLE ROW LEVEL SECURITY;

-- Solutions policies - public read, admin write
CREATE POLICY "Anyone can view active solutions" ON public.solutions
  FOR SELECT USING (status = 'active');

CREATE POLICY "Admins can manage solutions" ON public.solutions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.admin_users au 
      WHERE au.user_id = auth.uid() AND au.is_active = true
    )
  );

-- Create trigger for solutions updated_at
CREATE TRIGGER update_solutions_updated_at
  BEFORE UPDATE ON public.solutions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample admin user (you'll need to create this user in Supabase Auth first)
-- This is just a placeholder - replace with actual admin user ID after creating in auth
-- INSERT INTO public.admin_users (user_id, email) 
-- VALUES ('00000000-0000-0000-0000-000000000000', 'admin@example.com');