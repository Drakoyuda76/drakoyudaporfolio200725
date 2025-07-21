import Header from '@/components/layout/Header';
import SolutionsGrid from '@/components/home/SolutionsGrid';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const SolutionsPage = () => {
  return (
    <div className="min-h-screen bg-background font-tomorrow">
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
            <h1 className="text-4xl font-bold text-foreground mb-4">
              As Nossas Soluções
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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