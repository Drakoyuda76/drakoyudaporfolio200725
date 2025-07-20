import { Solution, ImpactMetrics } from '@/types/solution';

export const impactMetrics: ImpactMetrics = {
  totalHoursSaved: 8247,
  totalUsers: 1250,
  activeSolutions: 12,
  partnerships: 8,
};

export const solutions: Solution[] = [
  {
    id: 'assistente-financeiro-pessoal',
    title: 'Assistente Financeiro Pessoal',
    subtitle: 'IA para Gestão Financeira Inteligente',
    description: 'Uma solução de IA que ajuda cidadãos angolanos a gerir as suas finanças pessoais, oferecendo conselhos personalizados baseados nos padrões de gastos locais.',
    status: 'teste-convite',
    businessAreaImpact: ['front-office', 'products-services'],
    problemSolution: 'Muitos angolanos enfrentam dificuldades na gestão das suas finanças pessoais devido à falta de educação financeira e ferramentas adequadas. O nosso assistente utiliza IA para analisar padrões de gastos e fornecer orientações personalizadas, considerando o contexto económico angolano.',
    humanImpact: 'Reduz o stress financeiro das famílias angolanas, aumenta a literacia financeira e promove uma cultura de poupança. Cada utilizador poupa em média 15 horas mensais em planeamento financeiro.',
    sustainabilityImpact: 'Contribui para o ODS 1 (Erradicação da Pobreza) ao melhorar a gestão financeira familiar, e para o ODS 8 (Trabalho Digno e Crescimento Económico) ao promover hábitos financeiros saudáveis.',
    sdgGoals: [1, 8, 4],
    images: [
      {
        id: 'dashboard',
        title: 'Dashboard Principal',
        description: 'Interface principal com visão geral das finanças',
        colorScheme: 'from-emerald-600 to-teal-700'
      },
      {
        id: 'insights',
        title: 'Insights Personalizados',
        description: 'Análises e recomendações baseadas em IA',
        colorScheme: 'from-blue-600 to-indigo-700'
      },
      {
        id: 'planning',
        title: 'Planeamento de Objetivos',
        description: 'Ferramenta para definir e acompanhar metas financeiras',
        colorScheme: 'from-purple-600 to-pink-700'
      }
    ],
    timesSaved: 2340,
    usersImpacted: 156,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-07-10'),
  },
  {
    id: 'tradutor-kimbundu-portugues',
    title: 'Tradutor Kimbundu-Português',
    subtitle: 'Preservação Digital da Cultura Angolana',
    description: 'Sistema de tradução automática entre Kimbundu e Português, preservando a riqueza linguística de Angola através da tecnologia.',
    status: 'prototipo',
    businessAreaImpact: ['products-services', 'core-capabilities'],
    problemSolution: 'A perda gradual das línguas nacionais ameaça a preservação cultural de Angola. O nosso tradutor usa processamento de linguagem natural para facilitar a comunicação e preservar o Kimbundu digitalmente.',
    humanImpact: 'Fortalece a identidade cultural angolana, facilita a comunicação intergeracional e promove a inclusão linguística. Reduz barreiras de comunicação para 2 milhões de falantes de Kimbundu.',
    sustainabilityImpact: 'Alinha-se com o ODS 4 (Educação de Qualidade) ao promover a preservação cultural e o ODS 11 (Cidades e Comunidades Sustentáveis) ao fortalecer a coesão social.',
    sdgGoals: [4, 11, 16],
    images: [
      {
        id: 'interface',
        title: 'Interface de Tradução',
        description: 'Sistema intuitivo de tradução bidirecional',
        colorScheme: 'from-orange-600 to-red-700'
      },
      {
        id: 'dictionary',
        title: 'Dicionário Cultural',
        description: 'Base de dados rica em contexto cultural',
        colorScheme: 'from-yellow-600 to-orange-700'
      },
      {
        id: 'learning',
        title: 'Módulo de Aprendizagem',
        description: 'Ferramentas para aprender e praticar Kimbundu',
        colorScheme: 'from-green-600 to-emerald-700'
      }
    ],
    timesSaved: 1890,
    usersImpacted: 420,
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-07-15'),
  },
  {
    id: 'otimizador-transporte-publico',
    title: 'Otimizador de Transporte Público',
    subtitle: 'IA para Mobilidade Urbana Inteligente',
    description: 'Solução de IA que otimiza rotas e horários do transporte público em Luanda, reduzindo tempos de espera e melhorando a eficiência.',
    status: 'parceria',
    businessAreaImpact: ['core-capabilities', 'back-office'],
    problemSolution: 'O transporte público em Luanda enfrenta desafios de eficiência e predictibilidade. A nossa IA analisa padrões de tráfego e demanda para otimizar rotas em tempo real.',
    humanImpact: 'Reduz o tempo de deslocação dos cidadãos luandenses em 30%, melhora a qualidade de vida urbana e diminui o stress do transporte diário. Beneficia diretamente 800.000 utilizadores de transporte público.',
    sustainabilityImpact: 'Contribui para o ODS 11 (Cidades e Comunidades Sustentáveis) ao melhorar a mobilidade urbana e para o ODS 13 (Ação Climática) ao reduzir emissões.',
    sdgGoals: [11, 13, 9],
    images: [
      {
        id: 'realtime',
        title: 'Monitorização em Tempo Real',
        description: 'Dashboard de controlo de frotas e rotas',
        colorScheme: 'from-cyan-600 to-blue-700'
      },
      {
        id: 'prediction',
        title: 'Predição de Demanda',
        description: 'Algoritmos de previsão de fluxo de passageiros',
        colorScheme: 'from-indigo-600 to-purple-700'
      },
      {
        id: 'optimization',
        title: 'Otimização de Rotas',
        description: 'Sistema automático de ajuste de percursos',
        colorScheme: 'from-teal-600 to-cyan-700'
      }
    ],
    timesSaved: 3200,
    usersImpacted: 850,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-07-20'),
  },
  {
    id: 'assistente-saude-comunitaria',
    title: 'Assistente de Saúde Comunitária',
    subtitle: 'IA para Cuidados de Saúde Primários',
    description: 'Sistema de IA que apoia agentes de saúde comunitária no diagnóstico preliminar e orientação de cuidados em zonas rurais.',
    status: 'teste-usuarios',
    businessAreaImpact: ['front-office', 'core-capabilities'],
    problemSolution: 'O acesso limitado a cuidados de saúde em zonas rurais de Angola cria lacunas no atendimento básico. O nosso assistente IA capacita agentes comunitários com ferramentas de diagnóstico preliminar.',
    humanImpact: 'Melhora o acesso aos cuidados de saúde para 500.000 angolanos em zonas rurais, reduz a mortalidade infantil e materna, e fortalece o sistema de saúde comunitária.',
    sustainabilityImpact: 'Alinha-se diretamente com o ODS 3 (Saúde e Bem-Estar) ao melhorar o acesso aos cuidados de saúde e com o ODS 10 (Redução das Desigualdades) ao servir populações marginalizadas.',
    sdgGoals: [3, 10, 1],
    images: [
      {
        id: 'diagnosis',
        title: 'Sistema de Diagnóstico',
        description: 'Interface para avaliação de sintomas',
        colorScheme: 'from-rose-600 to-pink-700'
      },
      {
        id: 'guidelines',
        title: 'Protocolos de Tratamento',
        description: 'Guias baseados em evidência para agentes',
        colorScheme: 'from-emerald-600 to-green-700'
      },
      {
        id: 'tracking',
        title: 'Acompanhamento de Pacientes',
        description: 'Sistema de monitorização contínua',
        colorScheme: 'from-blue-600 to-cyan-700'
      }
    ],
    timesSaved: 820,
    usersImpacted: 120,
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-07-25'),
  }
];

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