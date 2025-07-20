import { Heart, Lightbulb, Users, Target, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import teamCollaboration from '@/assets/team-collaboration.jpg';

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: 'Humanidade em Primeiro',
      description: 'Cada solução é pensada para melhorar vidas reais, com empatia e compreensão cultural.',
    },
    {
      icon: Lightbulb,
      title: 'Inovação Contextualizada',
      description: 'Desenvolvemos tecnologia que faz sentido para a realidade angolana.',
    },
    {
      icon: Users,
      title: 'Impacto Comunitário',
      description: 'Focamos em soluções que beneficiam comunidades inteiras, não apenas indivíduos.',
    },
    {
      icon: Target,
      title: 'Micro Soluções, Macro Impacto',
      description: 'Pequenas soluções pensadas para gerar grandes transformações.',
    },
    {
      icon: Globe,
      title: 'Sustentabilidade',
      description: 'Alinhamos cada projeto com os Objetivos de Desenvolvimento Sustentável.',
    },
    {
      icon: Zap,
      title: 'Agilidade Angolana',
      description: 'Desenvolvimento rápido e iterativo, adaptado ao ritmo do mercado local.',
    },
  ];

  return (
    <section id="sobre" className="py-20 bg-gradient-to-b from-muted/20 to-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-tomorrow font-semibold text-3xl md:text-4xl text-foreground">
                Sobre a DrakoYuda
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Somos uma empresa angolana especializada em desenvolvimento de micro soluções de 
                Inteligência Artificial. A nossa missão é democratizar o acesso à tecnologia de IA, 
                criando ferramentas que ressoam com a realidade cultural e económica de Angola.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="font-tomorrow font-semibold text-xl text-foreground">
                A Nossa Filosofia
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-accent/5 border border-accent/20 rounded-lg">
                  <h4 className="font-medium text-accent mb-2">
                    "Pessoas como nós, fazem coisas assim"
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Esta frase não é apenas o nosso slogan; é a alma do nosso trabalho. 
                    Acreditamos que a melhor tecnologia vem de quem entende profundamente 
                    os problemas que procura resolver.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/40">
                    <div className="text-2xl font-tomorrow font-semibold text-accent">2024</div>
                    <p className="text-sm text-muted-foreground">Ano de Fundação</p>
                  </div>
                  <div className="text-center p-4 bg-card/50 rounded-lg border border-border/40">
                    <div className="text-2xl font-tomorrow font-semibold text-accent">100%</div>
                    <p className="text-sm text-muted-foreground">Angolano</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="space-y-6">
            <div className="relative rounded-xl overflow-hidden shadow-card">
              <img 
                src={teamCollaboration} 
                alt="Equipa DrakoYuda em colaboração" 
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-medium">Inovação Humana em IA</p>
                <p className="text-xs opacity-80">Luanda, Angola</p>
              </div>
            </div>

            <div className="text-center p-4 bg-gradient-impact rounded-lg border border-accent/10">
              <p className="text-sm text-muted-foreground italic">
                "A nossa visão é que cada angolano tenha acesso a ferramentas de IA que 
                simplificam a vida e potenciam o desenvolvimento pessoal e comunitário."
              </p>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div className="mt-20">
          <div className="text-center space-y-4 mb-12">
            <h3 className="font-tomorrow font-semibold text-2xl md:text-3xl text-foreground">
              Os Nossos Valores
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estes princípios guiam cada decisão que tomamos e cada linha de código que escrevemos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card 
                  key={index} 
                  className="border-border/40 bg-card/50 hover:bg-card/80 transition-all duration-300 hover:shadow-hover animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="text-center space-y-3">
                    <div className="mx-auto w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-lg font-tomorrow">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;