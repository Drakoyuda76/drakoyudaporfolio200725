-- Limpar duplicados na tabela estatisticas, mantendo apenas o mais recente
DELETE FROM estatisticas 
WHERE id NOT IN (
  SELECT id FROM estatisticas 
  ORDER BY updated_at DESC 
  LIMIT 1
);