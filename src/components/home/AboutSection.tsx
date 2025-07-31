import { useState, useEffect } from 'react';
import { Heart, Lightbulb, Users, Target, Globe, Zap } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import teamCollaboration from '@/assets/team-collaboration.jpg';

const AboutSection = () => {
  const [companyInfo, setCompanyInfo] = useState({
    nome: 'Drakoyuda',
    descricao: 'Transformamos negócios através de soluções tecnológicas inovadoras, criando um impacto positivo na sociedade angolana.',
    missao: 'Democratizar o acesso à tecnologia e criar soluções que impactem positivamente a vida das pessoas e organizações em Angola.',
    visao: 'Ser a empresa de tecnologia líder em Angola, reconhecida pela inovação e impacto social.',
    historia: 'Fundada com o propósito de transformar a realidade tecnológica de Angola, a Drakoyuda nasceu da visão de criar soluções que realmente fazem a diferença.',
    fundacao_ano: 2020
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanyInfo();

    // Listen for real-time updates
    const channel = supabase
      .channel('company_info_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'empresa_info' },
        (payload) => {
          console.log('Company info updated', payload);
          loadCompanyInfo();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadCompanyInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('empresa_info')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Erro ao carregar informações da empresa:', error);
        return;
      }

      if (data && data.length > 0) {
        const record = data[0];
        setCompanyInfo({
          nome: record.nome || 'Drakoyuda',
          descricao: record.descricao || 'Transformamos negócios através de soluções tecnológicas inovadoras, criando um impacto positivo na sociedade angolana.',
          missao: record.missao || 'Democratizar o acesso à tecnologia e criar soluções que impactem positivamente a vida das pessoas e organizações em Angola.',
          visao: record.visao || 'Ser a empresa de tecnologia líder em Angola, reconhecida pela inovação e impacto social.',
          historia: record.historia || 'Fundada com o propósito de transformar a realidade tecnológica de Angola, a Drakoyuda nasceu da visão de criar soluções que realmente fazem a diferença.',
          fundacao_ano: record.fundacao_ano || 2020
        });
      }
    } catch (error) {
      console.error('Erro ao carregar informações da empresa:', error);
    } finally {
      setLoading(false);
    }
  };
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
                Sobre a {companyInfo.nome}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {companyInfo.descricao}
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
                    <div className="text-2xl font-tomorrow font-semibold text-accent">{companyInfo.fundacao_ano}</div>
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
                "{companyInfo.visao}"
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