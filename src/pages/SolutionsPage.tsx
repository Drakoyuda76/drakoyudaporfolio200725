import Header from '@/components/layout/Header';
import SEOHead from '@/components/SEO/SEOHead';
import SolutionsGrid from '@/components/home/SolutionsGrid';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-background font-tomorrow">
      <SEOHead
        title="Soluções de IA"
        description="Descubra as 10 microsoluções de IA da DrakoYuda: Ana Lista, BotBwala, KendaNet e mais. Soluções desenvolvidas em Angola para resolver desafios locais."
        keywords="soluções IA angola, microsoluções inteligência artificial, Ana Lista, BotBwala, KendaNet, automação empresarial angola"
        path="/solucoes"
      />
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center space-x-4 mb-8">
            <Link 
              to="/" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="heading-primary mb-4">
              As Nossas Soluções
            </h1>
            <p className="body-large max-w-3xl mx-auto">
              Cada solução da DrakoYuda é desenvolvida para resolver desafios reais em Angola, 
              usando inteligência artificial human-cêntrica que coloca as pessoas no centro da inovação.
            </p>
          </div>
          
          {/* Complete solutions grid */}
          <SolutionsGrid />
        </div>
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

export default SolutionsPage;