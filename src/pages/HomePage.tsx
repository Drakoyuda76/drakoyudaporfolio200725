import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import SEOHead from '@/components/SEO/SEOHead';
import MetricCard from '@/components/ui/metric-card';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Clock, TrendingUp, MessageCircle } from 'lucide-react';
import SolutionCard from '@/components/ui/solution-card';
import { solutions } from '@/data/solutions';

const HomePage = () => {
  // Get 3 featured solutions (live, parceria, and one more)
  const featuredSolutions = solutions
    .filter(s => ['live', 'parceria', 'teste-usuarios'].includes(s.status))
    .slice(0, 3);

  // Calculate actual metrics from solutions data
  const totalHoursSaved = solutions.reduce((sum, solution) => sum + solution.timesSaved, 0);
  const totalUsersImpacted = solutions.reduce((sum, solution) => sum + solution.usersImpacted, 0);

  return (
    <div className="min-h-screen bg-background font-tomorrow">
      <SEOHead
        title="Início"
        description="DrakoYuda Soluções desenvolve microsoluções de inteligência artificial human-cêntricas para resolver desafios reais em Angola. Explore as nossas 10 soluções inovadoras."
        keywords="inteligência artificial angola, IA angola, soluções AI angola, DrakoYuda, microsoluções IA, tecnologia angola, automação angola"
        path="/"
      />
      <Header />
      
      <main>
        {/* Hero Section - Enhanced with compelling messaging */}
        <section className="py-24 bg-gradient-to-br from-background to-card/30">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="heading-primary mb-6">
              IA Human-Cêntrica<br />
              <span className="text-primary">
                Desenvolvida em Angola
              </span>
            </h1>
            <p className="body-large max-w-3xl mx-auto mb-8">
              Transformamos desafios angolanos em soluções inteligentes. 
              Cada microsolução da DrakoYuda é criada para empoderar pessoas e comunidades.
            </p>
            
            {/* Compelling CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/solucoes"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center hover:shadow-lg transform hover:scale-105"
              >
                Explorar Soluções IA
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contacto"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all duration-300 inline-flex items-center justify-center"
              >
                Falar Connosco
                <MessageCircle className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Metrics - Professional Visual Hierarchy */}
        <section className="py-16 bg-card/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-4">O Nosso Impacto Quantitativo</h2>
              <p className="body-regular text-muted-foreground max-w-2xl mx-auto">
                Resultados concretos das nossas soluções de IA desenvolvidas em Angola para Angola
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <MetricCard 
                value={`${totalHoursSaved.toLocaleString()}h`}
                label="Horas de Trabalho Poupadas"
                description="Automatização inteligente libertando tempo para tarefas estratégicas"
                icon={Clock}
              />
              <MetricCard 
                value={`${totalUsersImpacted.toLocaleString()}+`}
                label="Pessoas Impactadas"
                description="Cidadãos angolanos beneficiados pelas nossas soluções"
                icon={Users}
              />
              <MetricCard 
                value="85%"
                label="Eficiência Operacional"
                description="Melhoria média nos processos automatizados"
                icon={TrendingUp}
              />
            </div>
          </div>
        </section>

        {/* Featured Solutions */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="heading-secondary mb-4">
                Soluções em Destaque
              </h2>
              <p className="body-large max-w-3xl mx-auto">
                Descubra como a DrakoYuda está a transformar desafios reais em soluções inteligentes para Angola.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredSolutions.map((solution, index) => (
                <SolutionCard key={solution.id} solution={solution} index={index} />
              ))}
            </div>
            
            {/* CTA to full solutions page */}
            <div className="text-center">
              <Link 
                to="/solucoes" 
                className="inline-flex items-center px-8 py-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Target className="mr-2 w-5 h-5" />
                <span>Ver Todas as Soluções</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

      </main>
      
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