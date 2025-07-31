import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Globe, Loader2 } from 'lucide-react';
import SolutionCard from '@/components/ui/solution-card';
import { supabase } from '@/integrations/supabase/client';

interface Solucao {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  business_area_impact: string[];
  problem_solution: string;
  human_impact: string;
  sustainability_impact: string;
  sdg_goals: number[];
  times_saved: number;
  users_impacted: number;
  icon_url: string | null;
  images_urls: string[];
  created_at: string;
  updated_at: string;
}

interface Estatisticas {
  total_horas_poupadas: number;
  total_utilizadores_impactados: number;
  total_solucoes: number;
  solucoes_ativas: number;
  parcerias_ativas: number;
}

const HomePage = () => {
  const [featuredSolutions, setFeaturedSolutions] = useState<Solucao[]>([]);
  const [estatisticas, setEstatisticas] = useState<Estatisticas | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      // Carregar soluções em destaque
      const { data: solucoesData, error: solucoesError } = await supabase
        .from('solucoes')
        .select('*')
        .in('status', ['live', 'parceria', 'teste-usuarios'])
        .limit(3);

      if (solucoesError) throw solucoesError;
      setFeaturedSolutions(solucoesData || []);

      // Carregar estatísticas
      const { data: estatisticasData, error: estatisticasError } = await supabase
        .from('estatisticas')
        .select('*')
        .limit(1)
        .single();

      if (estatisticasError && estatisticasError.code !== 'PGRST116') {
        console.error('Erro ao carregar estatísticas:', estatisticasError);
      }
      setEstatisticas(estatisticasData);

    } catch (error) {
      console.error('Erro ao carregar dados da homepage:', error);
    } finally {
      setLoading(false);
    }
  };

  // Converte solução para o formato esperado pelo SolutionCard
  const convertSolutionFormat = (solucao: Solucao) => ({
    id: solucao.id,
    title: solucao.title,
    subtitle: solucao.subtitle,
    description: solucao.description,
    status: solucao.status as any,
    businessAreaImpact: solucao.business_area_impact as any[],
    problemSolution: solucao.problem_solution,
    humanImpact: solucao.human_impact,
    sustainabilityImpact: solucao.sustainability_impact,
    sdgGoals: solucao.sdg_goals,
    timesSaved: solucao.times_saved,
    usersImpacted: solucao.users_impacted,
    images: solucao.images_urls.map((url, index) => ({
      id: `${index + 1}`,
      title: `Imagem ${index + 1}`,
      description: `Demonstração da ${solucao.title}`,
      colorScheme: `from-blue-${500 + index * 100} to-blue-${600 + index * 100}`
    })),
    createdAt: new Date(solucao.created_at),
    updatedAt: new Date(solucao.updated_at)
  });

  return (
    <div className="min-h-screen bg-background font-tomorrow">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section id="home">
          <HeroSection />
        </section>

        {/* Featured Solutions */}
        <section className="py-16 bg-card/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Soluções em Destaque
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Descubra como a DrakoYuda está a transformar desafios reais em soluções inteligentes para Angola.
              </p>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">A carregar soluções...</span>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {featuredSolutions.map((solution, index) => (
                  <SolutionCard key={solution.id} solution={convertSolutionFormat(solution)} index={index} />
                ))}
              </div>
            )}
            
            {/* CTA to full solutions page */}
            <div className="text-center">
              <Link 
                to="/solucoes" 
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-forest-600 to-forest-700 hover:from-forest-700 hover:to-forest-800 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Target className="mr-2 w-5 h-5" />
                <span>Ver Todas as Soluções</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold text-forest-600">
                  {loading ? '...' : `${estatisticas?.total_solucoes || 0}+`}
                </div>
                <div className="text-lg font-semibold text-foreground">Soluções Desenvolvidas</div>
                <p className="text-muted-foreground">Cada uma focada em resolver desafios específicos</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-earth-500">
                  {loading ? '...' : `${estatisticas?.total_horas_poupadas?.toLocaleString() || 0}+`}
                </div>
                <div className="text-lg font-semibold text-foreground">Horas Poupadas</div>
                <p className="text-muted-foreground">Automatização que liberta tempo para o que importa</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-crimson-500">
                  {loading ? '...' : `${estatisticas?.total_utilizadores_impactados?.toLocaleString() || 0}+`}
                </div>
                <div className="text-lg font-semibold text-foreground">Utilizadores Impactados</div>
                <p className="text-muted-foreground">Pessoas que beneficiaram das nossas soluções</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* BotBwala Chatbot - Fixed na lateral direita */}
      <div 
        className="fixed bottom-4 right-4" 
        style={{ 
          zIndex: 9999, 
          position: 'fixed',
          display: 'block',
          visibility: 'visible',
          opacity: 1
        }}
      >
        <iframe 
          src="https://87cfebbd-659b-481a-91f0-a323e38fd0d3.lovableproject.com/embed/system/95999609-cf1f-4aaf-965f-5133876efd11"
          style={{ width: '500px', height: '650px', border: 'none' }}
          allow="microphone; camera"
          loading="eager"
          title="BotBwala Chatbot"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
      {/* End BotBwala Chatbot */}
      
      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/30 py-8">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 DrakoYuda Soluções. Pessoas como nós, fazem coisas assim.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;