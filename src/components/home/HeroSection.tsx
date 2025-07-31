import { useState, useEffect } from 'react';
import { ArrowRight, Target, Users, TrendingUp, BarChart, Globe, Building, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import heroBanner from '@/assets/hero-banner.jpg';

// Demo Indicator Component
const DemoIndicator = () => (
  <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 mb-8 animate-fade-in">
    <div className="flex items-center space-x-2">
      <Lightbulb className="h-5 w-5 text-accent" />
      <p className="text-sm text-foreground">
        <strong>Demo Interativo:</strong> Explore as soluções da DrakoYuda clicando nas cartas abaixo. 
        Cada solução mostra impacto real e métricas detalhadas.
      </p>
    </div>
  </div>
);

const HeroSection = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [animatedValues, setAnimatedValues] = useState({
    hours: 0,
    users: 0,
    efficiency: 0,
  });
  const [estatisticas, setEstatisticas] = useState<any>(null);
  const [solucoes, setSolucoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      // Carregar estatísticas
      const { data: estatisticasData, error: estatisticasError } = await supabase
        .from('estatisticas')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (estatisticasError && estatisticasError.code !== 'PGRST116') {
        console.error('Erro ao carregar estatísticas:', estatisticasError);
      }
      
      // Carregar soluções para calcular áreas de negócio e ODS
      const { data: solucoesData, error: solucoesError } = await supabase
        .from('solucoes')
        .select('business_area_impact, sdg_goals');

      if (solucoesError) {
        console.error('Erro ao carregar soluções:', solucoesError);
      }

      setEstatisticas(estatisticasData);
      setSolucoes(solucoesData || []);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular áreas de negócio impactadas
  const calculateBusinessAreaStats = () => {
    const businessAreas: { [key: string]: number } = {};
    solucoes.forEach(solucao => {
      if (solucao.business_area_impact) {
        solucao.business_area_impact.forEach((area: string) => {
          businessAreas[area] = (businessAreas[area] || 0) + 1;
        });
      }
    });

    const areaLabels: { [key: string]: string } = {
      'front-office': 'Front Office',
      'back-office': 'Back Office',
      'core-capabilities': 'Core Capabilities',
      'products-services': 'Products & Services'
    };

    return Object.entries(businessAreas).map(([area, count]) => ({
      area,
      label: areaLabels[area] || area,
      solutionsCount: count
    }));
  };

  // Calcular ODS alinhados
  const calculateSDGStats = () => {
    const sdgGoals: { [key: number]: number } = {};
    solucoes.forEach(solucao => {
      if (solucao.sdg_goals) {
        solucao.sdg_goals.forEach((goal: number) => {
          sdgGoals[goal] = (sdgGoals[goal] || 0) + 1;
        });
      }
    });

    return Object.entries(sdgGoals).map(([goal, count]) => ({
      goal: parseInt(goal),
      solutionsCount: count
    }));
  };

  const businessAreaStats = calculateBusinessAreaStats();
  const sdgStats = calculateSDGStats();

  useEffect(() => {
    if (!estatisticas || loading) return;

    // Animação dos contadores
    const duration = 2500;
    const steps = 80;
    
    const targets = {
      hours: estatisticas.total_horas_poupadas || 0,
      users: estatisticas.total_utilizadores_impactados || 0,
      efficiency: 1, // Eficiência operacional fixa por enquanto
    };
    
    const increments = {
      hours: targets.hours / steps,
      users: targets.users / steps,
      efficiency: targets.efficiency / steps,
    };

    let current = { hours: 0, users: 0, efficiency: 0 };

    const timer = setInterval(() => {
      current.hours += increments.hours;
      current.users += increments.users;
      current.efficiency += increments.efficiency;
      
      if (current.hours >= targets.hours) {
        setAnimatedValues(targets);
        clearInterval(timer);
      } else {
        setAnimatedValues({
          hours: Math.floor(current.hours),
          users: Math.floor(current.users),
          efficiency: Math.floor(current.efficiency),
        });
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [estatisticas, loading]);

  const impactMetrics = [
    {
      value: animatedValues.hours.toLocaleString(),
      label: 'Horas de Trabalho Poupadas',
      description: 'Através das nossas soluções de IA',
      icon: Target,
      suffix: '+',
    },
    {
      value: animatedValues.users.toLocaleString(),
      label: 'Pessoas Impactadas',
      description: 'Cidadãos angolanos beneficiados',
      icon: Users,
      suffix: '+',
    },
    {
      value: `${animatedValues.efficiency}%`,
      label: 'Eficiência Operacional',
      description: 'Redução de erros e tempo de resposta',
      icon: TrendingUp,
      suffix: '',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-background/95 to-muted/30">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBanner} 
          alt="DrakoYuda Innovation" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/95" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10">
            <div className="space-y-8">
              <div className="inline-flex items-center px-5 py-3 rounded-full bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 text-accent text-sm font-medium backdrop-blur-sm">
                <span className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse" />
                IA Human-Cêntrica Angolana
              </div>
              
              <div className="space-y-4">
                <h1 className="font-tomorrow font-semibold text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight">
                  Onde a Jornada{' '}
                  <span className="bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent">
                    Começa
                  </span>
                </h1>
                
                <h2 className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
                  Transformando Desafios em Soluções com IA Human-Cêntrica
                </h2>
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Na DrakoYuda Soluções, acreditamos no poder da inteligência artificial para empoderar pessoas e comunidades. 
                Cada microsolução que criamos é um passo em direção a um futuro mais eficiente, justo e conectado para Angola.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-accent to-accent/90 hover:from-accent/90 hover:to-accent/80 text-accent-foreground font-medium group shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('solucoes');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Explorar Soluções
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border/60 hover:bg-accent/5 hover:border-accent/30 backdrop-blur-sm transition-all duration-300"
                onClick={() => {
                  const element = document.getElementById('contacto');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
              >
                Falar Connosco
              </Button>
            </div>
          </div>

          {/* Impact Dashboard */}
          <div className="space-y-8">
            {/* Main Impact Metrics */}
            <div className="space-y-6">
              <h3 className="font-tomorrow font-semibold text-2xl text-foreground">
                O Nosso Impacto Quantitativo
              </h3>
              
              <div className="grid gap-4">
                {impactMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={index}
                      className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer backdrop-blur-sm ${
                        currentMetric === index
                          ? 'bg-gradient-to-r from-accent/10 to-accent/5 border-accent/30 shadow-lg scale-105'
                          : 'bg-card/50 border-border/40 hover:bg-card/80 hover:border-accent/20'
                      }`}
                      onClick={() => setCurrentMetric(index)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-xl transition-all duration-300 ${
                          currentMetric === index 
                            ? 'bg-gradient-to-br from-accent/20 to-accent/10 text-accent' 
                            : 'bg-muted/50 text-muted-foreground group-hover:bg-accent/10 group-hover:text-accent/80'
                        }`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className={`text-3xl font-tomorrow font-bold transition-colors ${
                            currentMetric === index ? 'text-accent' : 'text-foreground'
                          }`}>
                            {metric.value}{metric.suffix}
                          </div>
                          <div className="text-sm font-semibold text-foreground mt-1">
                            {metric.label}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {metric.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Business Areas Impact */}
            <div className="space-y-4">
              <h4 className="font-tomorrow font-medium text-lg text-foreground flex items-center">
                <Building className="h-5 w-5 mr-2 text-accent" />
                Áreas de Negócio Impactadas
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {businessAreaStats.map((area, index) => (
                  <div key={area.area} className="flex items-center justify-between p-3 rounded-lg bg-card/40 border border-border/30">
                    <span className="text-sm font-medium text-foreground">{area.label}</span>
                    <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                      {area.solutionsCount}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* SDG Alignment */}
            <div className="space-y-4">
              <h4 className="font-tomorrow font-medium text-lg text-foreground flex items-center">
                <Globe className="h-5 w-5 mr-2 text-accent" />
                ODS Alinhados
              </h4>
              <div className="flex flex-wrap gap-2">
                {sdgStats.slice(0, 6).map((sdg) => (
                  <div key={sdg.goal} className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
                    <span className="text-sm font-semibold text-accent">ODS {sdg.goal}</span>
                    <Badge variant="secondary" className="bg-accent/20 text-accent text-xs">
                      {sdg.solutionsCount}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission Statement */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-accent/5 to-accent/10 border border-accent/20 backdrop-blur-sm">
              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "A nossa missão é democratizar o acesso à tecnologia de IA, criando soluções que ressoam 
                com a realidade angolana e empoderam as nossas comunidades."
              </p>
            </div>
          </div>
        </div>
        
        {/* Demo Indicator */}
        <DemoIndicator />
      </div>
    </section>
  );
};

export default HeroSection;