// Script de teste para verificar se as funções estão funcionando
console.log('Testando conexão com banco de dados...');

// Este script será executado no console para testar as funcionalidades
window.testDatabaseFunctions = async () => {
  try {
    // Teste de carregamento de estatísticas
    console.log('Testando carregamento de estatísticas...');
    const { data: stats, error: statsError } = await window.supabase
      .from('estatisticas')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    
    console.log('Estatísticas:', stats, 'Erro:', statsError);

    // Teste de carregamento de empresa
    console.log('Testando carregamento de empresa...');
    const { data: company, error: companyError } = await window.supabase
      .from('empresa_info')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    
    console.log('Empresa:', company, 'Erro:', companyError);

    // Teste de carregamento de contactos
    console.log('Testando carregamento de contactos...');
    const { data: contacts, error: contactsError } = await window.supabase
      .from('empresa_contactos')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();
    
    console.log('Contactos:', contacts, 'Erro:', contactsError);

    // Teste de carregamento de soluções
    console.log('Testando carregamento de soluções...');
    const { data: solutions, error: solutionsError } = await window.supabase
      .from('solucoes')
      .select('*')
      .limit(5);
    
    console.log('Soluções:', solutions, 'Erro:', solutionsError);

    console.log('✅ Testes concluídos!');
  } catch (error) {
    console.error('❌ Erro nos testes:', error);
  }
};

console.log('Execute window.testDatabaseFunctions() no console para testar.');