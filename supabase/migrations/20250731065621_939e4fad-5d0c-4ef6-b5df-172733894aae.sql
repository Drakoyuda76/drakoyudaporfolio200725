-- Clean and fix data integrity issues
-- Remove duplicate records that might cause conflicts
DELETE FROM estatisticas WHERE id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY updated_at DESC) as rn
    FROM estatisticas
  ) ranked WHERE rn = 1
);

DELETE FROM empresa_info WHERE id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY updated_at DESC) as rn
    FROM empresa_info
  ) ranked WHERE rn = 1
);

DELETE FROM empresa_contactos WHERE id NOT IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (ORDER BY updated_at DESC) as rn
    FROM empresa_contactos
  ) ranked WHERE rn = 1
);

-- Ensure we have at least one record in each table with proper defaults
INSERT INTO estatisticas (
  total_solucoes, solucoes_ativas, parcerias_ativas, 
  total_horas_poupadas, total_utilizadores_impactados
) 
SELECT 0, 0, 0, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM estatisticas);

INSERT INTO empresa_info (
  nome, descricao, missao, visao, historia, fundacao_ano
) 
SELECT 
  'DrakoYuda', 
  'Soluções inovadoras para transformação digital',
  'Transformar desafios complexos em soluções simples e eficazes',
  'Ser líder em inovação tecnológica em África',
  'A DrakoYuda foi fundada com o objetivo de criar soluções que impactam positivamente a sociedade através da tecnologia.',
  2024
WHERE NOT EXISTS (SELECT 1 FROM empresa_info);

INSERT INTO empresa_contactos (
  telefone, email_geral, email_parcerias, endereco, linkedin_url
) 
SELECT 
  '+244 XXX XXX XXX',
  'geral@drakoyuda.com',
  'parcerias@drakoyuda.com', 
  'Luanda, Angola',
  'https://linkedin.com/company/drakoyuda'
WHERE NOT EXISTS (SELECT 1 FROM empresa_contactos);