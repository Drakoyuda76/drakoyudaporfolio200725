import Header from '@/components/layout/Header';
import AboutSection from '@/components/home/AboutSection';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatbotLoader from '@/components/ui/chatbot-loader';

const AboutPage = () => {
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
              Sobre a DrakoYuda
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Conheça a nossa missão, visão e os valores que nos guiam na criação de soluções tecnológicas 
              que fazem a diferença em Angola.
            </p>
          </div>
          
          {/* About content */}
          <AboutSection />
        </div>
      </main>
      
      {/* BotBwala Chatbot - Fixed na lateral direita */}
      <ChatbotLoader src="https://87cfebbd-659b-481a-91f0-a323e38fd0d3.lovableproject.com/embed/system/95999609-cf1f-4aaf-965f-5133876efd11" />
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

export default AboutPage;