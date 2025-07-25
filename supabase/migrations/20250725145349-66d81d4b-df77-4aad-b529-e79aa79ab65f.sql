-- Inserir usuário admin com credenciais corretas
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'drakoyuda76@gmail.com',
  crypt('1234d', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Inserir na tabela admin_users também
INSERT INTO public.admin_users (email, password_hash, name) 
VALUES ('drakoyuda76@gmail.com', crypt('1234d', gen_salt('bf')), 'DrakoYuda Admin')
ON CONFLICT (email) DO NOTHING;