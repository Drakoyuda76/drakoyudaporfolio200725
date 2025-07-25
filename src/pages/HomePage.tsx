import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Users, Globe } from 'lucide-react';
import SolutionCard from '@/components/ui/solution-card';
import { solutions } from '@/data/solutions';

const HomePage = () => {
  // Get 3 featured solutions (live, parceria, and one more)
  const featuredSolutions = solutions
    .filter(s => ['live', 'parceria', 'teste-usuarios'].includes(s.status))
    .slice(0, 3);

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
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {featuredSolutions.map((solution, index) => (
                <SolutionCard key={solution.id} solution={solution} index={index} />
              ))}
            </div>
            
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
                <div className="text-4xl font-bold text-forest-600">10+</div>
                <div className="text-lg font-semibold text-foreground">Soluções Desenvolvidas</div>
                <p className="text-muted-foreground">Cada uma focada em resolver desafios específicos</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-earth-500">1000+</div>
                <div className="text-lg font-semibold text-foreground">Horas Poupadas</div>
                <p className="text-muted-foreground">Automatização que liberta tempo para o que importa</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-crimson-500">5</div>
                <div className="text-lg font-semibold text-foreground">ODS Alinhados</div>
                <p className="text-muted-foreground">Contribuindo para os Objetivos de Desenvolvimento Sustentável</p>
              </div>
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