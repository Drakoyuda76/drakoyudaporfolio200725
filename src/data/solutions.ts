import { Solution, ImpactMetrics, SDGAlignment, BusinessAreaStats, BusinessArea } from '@/types/solution';

export const impactMetrics: ImpactMetrics = {
  totalHoursSaved: 8247,
  totalUsers: 1826,
  activeSolutions: 12,
  partnerships: 8,
  errorReduction: 85,
  responseTimeReduction: 40,
  communitiesImpacted: 15,
  financialLiteracyIncrease: 67,
};

export const sdgData: SDGAlignment[] = [
  { goal: 1, title: 'Erradicação da Pobreza', solutionsCount: 0 },
  { goal: 3, title: 'Saúde e Bem-Estar', solutionsCount: 0 },
  { goal: 4, title: 'Educação de Qualidade', solutionsCount: 0 },
  { goal: 8, title: 'Trabalho Digno e Crescimento Económico', solutionsCount: 0 },
  { goal: 9, title: 'Indústria, Inovação e Infraestrutura', solutionsCount: 0 },
  { goal: 10, title: 'Redução das Desigualdades', solutionsCount: 0 },
  { goal: 11, title: 'Cidades e Comunidades Sustentáveis', solutionsCount: 0 },
  { goal: 13, title: 'Ação Climática', solutionsCount: 0 },
  { goal: 16, title: 'Paz, Justiça e Instituições Eficazes', solutionsCount: 0 },
];

// Real DrakoYuda Portfolio - Complete 10 Solutions
export const realPortfolioData: Solution[] = [
  {
    id: 'ana-lista',
    title: 'Ana Lista',
    subtitle: 'Contabilidade Angolana Simplificada',
    description: 'Revoluciona a contabilidade angolana, convertendo Balancetes em relatórios contabilísticos padronizados de forma automática e precisa. Reduz o trabalho manual e o risco de erro para contabilistas e gestores.',
    status: 'teste-convite',
    businessAreaImpact: ['back-office'],
    problemSolution: 'Transforma processos manuais de contabilidade em fluxos automatizados, eliminando erros humanos e aumentando a precisão dos relatórios financeiros.',
    humanImpact: 'Liberta contabilistas de tarefas repetitivas, permitindo foco em análise estratégica. Reduz stress e aumenta satisfação profissional.',
    sustainabilityImpact: 'Contribui para ODS 8 (Trabalho Decente) e ODS 9 (Inovação), promovendo crescimento económico sustentável através da automatização inteligente.',
    sdgGoals: [8, 9],
    timesSaved: 1200,
    usersImpacted: 150,
    images: [
      { id: '1', title: 'Interface de relatório contabilístico automatizado', description: 'Dashboard principal da Ana Lista', colorScheme: 'from-blue-600 to-blue-700' },
      { id: '2', title: 'Dashboard de análise financeira', description: 'Análise avançada de dados', colorScheme: 'from-indigo-600 to-blue-600' },
      { id: '3', title: 'Processo de conversão de balancetes', description: 'Fluxo automatizado', colorScheme: 'from-cyan-600 to-blue-600' }
    ],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'bot-bwala',
    title: 'BotBwala',
    subtitle: 'Sua IA Pessoal no WhatsApp',
    description: 'Uma interface intuitiva, semelhante ao WhatsApp, que permite interagir diretamente com assistentes de IA personalizados para realizar tarefas específicas. Simplifica o acesso a ferramentas de IA poderosas.',
    status: 'prototipo',
    businessAreaImpact: ['products-services', 'front-office'],
    problemSolution: 'Democratiza o acesso a IA através de interface familiar (WhatsApp), eliminando barreiras tecnológicas e tornando IA acessível para todos.',
    humanImpact: 'Empodera utilizadores com acesso simples a assistentes inteligentes, aumentando produtividade e reduzindo fricção tecnológica.',
    sustainabilityImpact: 'Alinha com ODS 4 (Educação de Qualidade) e ODS 9 (Inovação), promovendo inclusão digital e literacia tecnológica.',
    sdgGoals: [4, 9],
    timesSaved: 800,
    usersImpacted: 500,
    images: [
      { id: '1', title: 'Interface de chat com IA', description: 'Chat interface do BotBwala', colorScheme: 'from-green-500 to-green-600' },
      { id: '2', title: 'Assistente IA respondendo perguntas', description: 'IA em ação', colorScheme: 'from-emerald-500 to-green-500' },
      { id: '3', title: 'Funcionalidades de IA disponíveis', description: 'Menu de funcionalidades', colorScheme: 'from-teal-500 to-green-500' }
    ],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'kenda-net',
    title: 'KendaNet',
    subtitle: 'O Hub Digital para Táxis Comunitários',
    description: 'Portal com funcionalidades de IA para táxis comunitários em Angola. Funciona como um hub de informação e serviços, criando um ecossistema digital para o transporte local.',
    status: 'parceria',
    businessAreaImpact: ['core-capabilities', 'front-office'],
    problemSolution: 'Organiza e digitaliza o transporte comunitário, conectando motoristas e passageiros através de tecnologia acessível e culturalmente apropriada.',
    humanImpact: 'Melhora mobilidade urbana, aumenta renda de motoristas e proporciona transporte mais seguro e eficiente para comunidades.',
    sustainabilityImpact: 'Contribui para ODS 11 (Cidades Sustentáveis) e ODS 8 (Trabalho Decente), promovendo desenvolvimento urbano inclusivo.',
    sdgGoals: [11, 8],
    timesSaved: 600,
    usersImpacted: 1200,
    images: [
      { id: '1', title: 'App móvel de reserva de táxi', description: 'Interface mobile do KendaNet', colorScheme: 'from-orange-500 to-orange-600' },
      { id: '2', title: 'Mapa de rotas comunitárias', description: 'Sistema de rotas', colorScheme: 'from-amber-500 to-orange-500' },
      { id: '3', title: 'Dashboard para motoristas', description: 'Painel do motorista', colorScheme: 'from-red-500 to-orange-500' }
    ],
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'hub-do-saber-fazer',
    title: 'HubDoSaberFazer',
    subtitle: 'Plataformas de IA Customizadas para Nichos',
    description: 'Uma solução white-label que permite criar portais de assistentes de IA customizados para nichos específicos, como formação assistida por IA ou suporte especializado.',
    status: 'parceria',
    businessAreaImpact: ['products-services', 'back-office'],
    problemSolution: 'Permite criação rápida de plataformas especializadas de IA, reduzindo tempo de desenvolvimento e custos de implementação para negócios específicos.',
    humanImpact: 'Facilita acesso a educação e formação personalizada, adaptando-se às necessidades específicas de diferentes sectores profissionais.',
    sustainabilityImpact: 'Apoia ODS 4 (Educação de Qualidade) e ODS 9 (Inovação), democratizando acesso a formação especializada.',
    sdgGoals: [4, 9],
    timesSaved: 2000,
    usersImpacted: 300,
    images: [
      { id: '1', title: 'Plataforma white-label customizada', description: 'Interface personalizável', colorScheme: 'from-purple-500 to-purple-600' },
      { id: '2', title: 'Interface de formação com IA', description: 'Sistema de formação', colorScheme: 'from-indigo-500 to-purple-500' },
      { id: '3', title: 'Dashboard de gestão de conteúdos', description: 'Gestão de conteúdo', colorScheme: 'from-violet-500 to-purple-500' }
    ],
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'angola-financas',
    title: 'Angola Finanças (Nelinho)',
    subtitle: 'Literacia Financeira para Pequenos Empresários',
    description: 'Capacita pequenos empresários com uma ferramenta de gestão financeira que transforma inputs em linguagem natural (estilo WhatsApp) em dados estruturados, promovendo a literacia financeira.',
    status: 'teste-usuarios',
    businessAreaImpact: ['front-office', 'products-services'],
    problemSolution: 'Simplifica gestão financeira para pequenos negócios, convertendo linguagem natural em registos estruturados e fornecendo insights financeiros acessíveis.',
    humanImpact: 'Empodera pequenos empresários com literacia financeira, reduzindo barreiras para gestão eficaz de negócios e promovendo crescimento económico inclusivo.',
    sustainabilityImpact: 'Alinha com ODS 8 (Trabalho Decente) e ODS 10 (Redução de Desigualdades), promovendo inclusão financeira.',
    sdgGoals: [8, 10],
    timesSaved: 1500,
    usersImpacted: 800,
    images: [
      { id: '1', title: 'App de gestão financeira mobile', description: 'Interface mobile do Nelinho', colorScheme: 'from-yellow-500 to-yellow-600' },
      { id: '2', title: 'Interface de chat para entrada de dados', description: 'Chat para dados financeiros', colorScheme: 'from-amber-500 to-yellow-500' },
      { id: '3', title: 'Relatórios financeiros simplificados', description: 'Relatórios automáticos', colorScheme: 'from-orange-400 to-yellow-500' }
    ],
    createdAt: new Date('2024-04-10'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'sr-junior',
    title: 'Sr. Junior',
    subtitle: 'Assistente de IA Mestre-Especialista',
    description: 'Um modelo conceptual onde um assistente "mestre" de IA, auxiliado por um grupo de "especialistas", guia os utilizadores através de processos complexos de forma intuitiva e eficaz.',
    status: 'conceito',
    businessAreaImpact: [],
    problemSolution: 'Desenvolve nova arquitectura de IA colaborativa onde múltiplos agentes especializados trabalham em conjunto para resolver problemas complexos.',
    humanImpact: 'Representa o futuro da interação humano-IA, prometendo assistência mais sofisticada e contextualmente relevante.',
    sustainabilityImpact: 'Contribui para ODS 4 (Educação) e ODS 9 (Inovação), avançando fronteiras da inteligência artificial.',
    sdgGoals: [4, 9],
    timesSaved: 0,
    usersImpacted: 0,
    images: [
      { id: '1', title: 'Diagrama conceitual mestre-especialista', description: 'Arquitectura conceitual', colorScheme: 'from-gray-500 to-gray-600' },
      { id: '2', title: 'Interface de IA colaborativa', description: 'Interface multi-agente', colorScheme: 'from-slate-500 to-gray-500' },
      { id: '3', title: 'Fluxo de trabalho de agentes IA', description: 'Fluxo colaborativo', colorScheme: 'from-zinc-500 to-gray-500' }
    ],
    createdAt: new Date('2024-05-01'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'gestao-contratos',
    title: 'Gestão de Contratos',
    subtitle: 'IA para Contratos: Segurança e Eficiência',
    description: 'Solução de IA que analisa contratos para extrair detalhes cruciais, garantindo que prazos são cumpridos e custos inesperados são evitados. Segurança e eficiência na gestão contratual.',
    status: 'teste-usuarios',
    businessAreaImpact: ['back-office'],
    problemSolution: 'Automatiza análise e monitorização de contratos, identificando riscos, prazos e obrigações para evitar penalizações e custos inesperados.',
    humanImpact: 'Reduz stress e carga cognitiva de gestores jurídicos, permitindo foco em negociação estratégica em vez de monitorização manual.',
    sustainabilityImpact: 'Contribui para ODS 8 (Trabalho Decente), melhorando eficiência operacional e reduzindo riscos de negócio.',
    sdgGoals: [8],
    timesSaved: 600,
    usersImpacted: 200,
    images: [
      { id: '1', title: 'Dashboard de análise de contratos', description: 'Análise automática', colorScheme: 'from-red-600 to-red-700' },
      { id: '2', title: 'Alertas de prazos e obrigações', description: 'Sistema de alertas', colorScheme: 'from-rose-600 to-red-600' },
      { id: '3', title: 'Relatório de riscos contratuais', description: 'Análise de riscos', colorScheme: 'from-pink-600 to-red-600' }
    ],
    createdAt: new Date('2024-05-15'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'document-generator',
    title: 'Document Generator',
    subtitle: 'Geração de Documentos Personalizados com IA',
    description: 'A nossa nova solução white-label que cria documentos personalizados – cartas, propostas, políticas, manuais – dentro de qualquer empresa, adaptada a necessidades específicas.',
    status: 'live',
    businessAreaImpact: ['back-office', 'products-services'],
    problemSolution: 'Automatiza criação de documentos empresariais, mantendo consistência, qualidade e personalização, reduzindo tempo de produção significativamente.',
    humanImpact: 'Liberta profissionais de tarefas repetitivas de escrita, permitindo foco em conteúdo estratégico e criatividade.',
    sustainabilityImpact: 'Alinha com ODS 9 (Inovação), promovendo eficiência operacional e redução de desperdícios de tempo.',
    sdgGoals: [9],
    timesSaved: 400,
    usersImpacted: 150,
    images: [
      { id: '1', title: 'Interface de geração de documentos', description: 'Gerador automático', colorScheme: 'from-cyan-600 to-cyan-700' },
      { id: '2', title: 'Templates personalizáveis', description: 'Templates flexíveis', colorScheme: 'from-sky-600 to-cyan-600' },
      { id: '3', title: 'Documentos gerados automaticamente', description: 'Output automático', colorScheme: 'from-blue-500 to-cyan-600' }
    ],
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'ai-assistants-service',
    title: 'AI Assistants Service',
    subtitle: 'Chatbots Personalizados para Engajamento',
    description: 'Criação e implementação de chatbots personalizados para bolhas de chat em websites e redes sociais. Otimiza a interação com o cliente, fornecendo respostas instantâneas e suporte 24/7.',
    status: 'live',
    businessAreaImpact: ['front-office', 'products-services'],
    problemSolution: 'Elimina tempos de espera para atendimento ao cliente, fornecendo respostas instantâneas e qualificadas 24/7 através de chatbots inteligentes.',
    humanImpact: 'Melhora experiência do cliente e reduz carga de trabalho de equipas de atendimento, permitindo foco em questões mais complexas.',
    sustainabilityImpact: 'Contribui para ODS 8 (Trabalho Decente), otimizando processos de atendimento e melhorando satisfação do cliente.',
    sdgGoals: [8],
    timesSaved: 1200,
    usersImpacted: 600,
    images: [
      { id: '1', title: 'Chatbot integrado em website', description: 'Integração web', colorScheme: 'from-violet-600 to-violet-700' },
      { id: '2', title: 'Interface de conversa com cliente', description: 'Chat em tempo real', colorScheme: 'from-purple-600 to-violet-600' },
      { id: '3', title: 'Dashboard de gestão de chatbots', description: 'Painel de controlo', colorScheme: 'from-indigo-600 to-violet-600' }
    ],
    createdAt: new Date('2024-06-15'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'agent-service',
    title: 'Agent Service',
    subtitle: 'Suporte Avançado e Automação com Agentes de IA',
    description: 'Serviço de detalhamento de suporte avançado ao cliente e automação de processos utilizando agentes de IA. Aumenta a eficiência operacional e melhora a experiência do cliente através de interações inteligentes e proativas.',
    status: 'live',
    businessAreaImpact: ['back-office', 'front-office'],
    problemSolution: 'Implementa agentes IA avançados que automatizam processos complexos e fornecem suporte proativo, reduzindo intervenção humana em tarefas rotineiras.',
    humanImpact: 'Eleva qualidade do atendimento ao cliente e permite que colaboradores se concentrem em tarefas de maior valor agregado.',
    sustainabilityImpact: 'Alinha com ODS 8 (Trabalho Decente) e ODS 9 (Inovação), promovendo automação inteligente e eficiência operacional.',
    sdgGoals: [8, 9],
    timesSaved: 900,
    usersImpacted: 400,
    images: [
      { id: '1', title: 'Agente IA em ação', description: 'IA trabalhando', colorScheme: 'from-teal-600 to-teal-700' },
      { id: '2', title: 'Automação de processos', description: 'Processos automatizados', colorScheme: 'from-emerald-600 to-teal-600' },
      { id: '3', title: 'Dashboard de monitorização', description: 'Monitorização em tempo real', colorScheme: 'from-green-600 to-teal-600' }
    ],
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-07-20'),
  }
];

// Initialize solutions with localStorage integration
let solutionsInstance: Solution[] | null = null;

export const getSolutions = (): Solution[] => {
  if (solutionsInstance) {
    return solutionsInstance;
  }
  
  // Try to load from localStorage first
  const savedSolutions = localStorage.getItem('drakoyuda_solutions');
  if (savedSolutions) {
    try {
      solutionsInstance = JSON.parse(savedSolutions);
      return solutionsInstance!;
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Failed to parse saved solutions, using real portfolio data');
      }
    }
  }
  
  // If no saved data, use real portfolio and save it
  solutionsInstance = realPortfolioData;
  localStorage.setItem('drakoyuda_solutions', JSON.stringify(solutionsInstance));
  return solutionsInstance;
};

export const solutions = getSolutions();

export const getStatusLabel = (status: string): string => {
  const labels = {
    'teste-convite': 'Teste por Convite',
    'prototipo': 'Protótipo',
    'parceria': 'Pronto para Parceria',
    'live': 'Live',
    'conceito': 'Conceito',
    'teste-usuarios': 'Teste de Utilizadores',
  };
  return labels[status as keyof typeof labels] || status;
};

export const getStatusColor = (status: string): string => {
  const colors = {
    'teste-convite': 'teste',
    'prototipo': 'prototipo', 
    'parceria': 'parceria',
    'live': 'live',
    'conceito': 'conceito',
    'teste-usuarios': 'usuarios',
  };
  return colors[status as keyof typeof colors] || 'conceito';
};

export const getBusinessAreaLabel = (area: string): string => {
  const labels = {
    'front-office': 'Front Office',
    'back-office': 'Back Office', 
    'core-capabilities': 'Core Capabilities',
    'products-services': 'Products & Services',
  };
  return labels[area as keyof typeof labels] || area;
};

// Calculate dynamic metrics from solutions data
export const calculateBusinessAreaStats = (): BusinessAreaStats[] => {
  const businessAreas: BusinessArea[] = ['front-office', 'back-office', 'core-capabilities', 'products-services'];
  const currentSolutions = getSolutions();
  
  return businessAreas.map(area => {
    const solutionsCount = currentSolutions.filter(solution => 
      solution.businessAreaImpact.includes(area)
    ).length;
    
    return {
      area,
      label: getBusinessAreaLabel(area),
      solutionsCount
    };
  });
};

export const calculateSDGStats = (): SDGAlignment[] => {
  const sdgCounts: { [key: number]: number } = {};
  const currentSolutions = getSolutions();
  
  currentSolutions.forEach(solution => {
    solution.sdgGoals.forEach(goal => {
      sdgCounts[goal] = (sdgCounts[goal] || 0) + 1;
    });
  });
  
  return sdgData.map(sdg => ({
    ...sdg,
    solutionsCount: sdgCounts[sdg.goal] || 0
  })).filter(sdg => sdg.solutionsCount > 0);
};

export const calculateTotalMetrics = () => {
  const currentSolutions = getSolutions();
  const totalHoursSaved = currentSolutions.reduce((total, solution) => total + solution.timesSaved, 0);
  const totalUsersImpacted = currentSolutions.reduce((total, solution) => total + solution.usersImpacted, 0);
  const communitiesImpacted = Math.floor(totalUsersImpacted / 100); // Estimate communities based on users
  
  return {
    totalHoursSaved,
    totalUsersImpacted,
    communitiesImpacted,
    activeSolutions: currentSolutions.length,
    errorReduction: impactMetrics.errorReduction || 85,
    responseTimeReduction: impactMetrics.responseTimeReduction || 40,
    financialLiteracyIncrease: impactMetrics.financialLiteracyIncrease || 67,
  };
};

// Utility function to update solutions and persist to localStorage
export const updateSolutions = (newSolutions: Solution[]): void => {
  solutionsInstance = newSolutions;
  localStorage.setItem('drakoyuda_solutions', JSON.stringify(newSolutions));
};