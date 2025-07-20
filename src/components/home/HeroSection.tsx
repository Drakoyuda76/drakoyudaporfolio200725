import { useState, useEffect } from 'react';
import { ArrowRight, Lightbulb, Users, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { impactMetrics } from '@/data/solutions';
import heroBanner from '@/assets/hero-banner.jpg';

const HeroSection = () => {
  const [currentMetric, setCurrentMetric] = useState(0);
  const [animatedHours, setAnimatedHours] = useState(0);

  useEffect(() => {
    // Animação do contador de horas
    const duration = 2000; // 2 segundos
    const steps = 60;
    const increment = impactMetrics.totalHoursSaved / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= impactMetrics.totalHoursSaved) {
        setAnimatedHours(impactMetrics.totalHoursSaved);
        clearInterval(timer);
      } else {
        setAnimatedHours(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const metrics = [
    {
      value: animatedHours.toLocaleString(),
      label: 'Horas de Trabalho Poupadas',
      description: 'Através das nossas soluções de IA',
      icon: Target,
    },
    {
      value: impactMetrics.totalUsers.toLocaleString(),
      label: 'Vidas Impactadas',
      description: 'Cidadãos angolanos beneficiados',
      icon: Users,
    },
    {
      value: impactMetrics.activeSolutions.toString(),
      label: 'Soluções Ativas',
      description: 'Micro soluções em desenvolvimento',
      icon: Lightbulb,
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBanner} 
          alt="DrakoYuda Innovation" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/90" />
      </div>

      <div className="container relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
                Inovação Angolana em IA
              </div>
              
              <h1 className="font-tomorrow font-semibold text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight">
                Pessoas como nós,{' '}
                <span className="text-accent">fazem coisas assim</span>
              </h1>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Desenvolvemos micro soluções de Inteligência Artificial feitas por angolanos, 
                para angolanos. Cada solução é pensada para resolver problemas reais da nossa 
                comunidade, com um coração profundamente humano e culturalmente sensível.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-medium group"
              >
                Explorar Soluções
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-border/60 hover:bg-muted/50"
              >
                Falar Connosco
              </Button>
            </div>
          </div>

          {/* Impact Metrics */}
          <div className="lg:pl-12">
            <div className="space-y-6">
              <h2 className="font-tomorrow font-semibold text-2xl text-foreground">
                O Nosso Impacto
              </h2>
              
              <div className="space-y-4">
                {metrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={index}
                      className={`p-6 rounded-xl border transition-all duration-300 cursor-pointer ${
                        currentMetric === index
                          ? 'bg-accent/5 border-accent/30 shadow-hover'
                          : 'bg-card/50 border-border/40 hover:bg-card/80'
                      }`}
                      onClick={() => setCurrentMetric(index)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${
                          currentMetric === index ? 'bg-accent/20 text-accent' : 'bg-muted/50 text-muted-foreground'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className={`text-2xl font-tomorrow font-semibold ${
                            currentMetric === index ? 'text-accent' : 'text-foreground'
                          }`}>
                            {metric.value}+
                          </div>
                          <div className="text-sm font-medium text-foreground">
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

              <div className="p-4 rounded-lg bg-gradient-impact border border-accent/10">
                <p className="text-sm text-muted-foreground italic">
                  "A nossa missão é democratizar o acesso à tecnologia de IA, 
                  criando soluções que ressoam com a realidade angolana."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;