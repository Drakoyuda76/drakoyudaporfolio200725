import Header from '@/components/layout/Header';
import ContactSection from '@/components/home/ContactSection';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
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
              Entre em Contacto
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tem uma ideia? Um desafio que precisa resolver? 
              Vamos conversar sobre como podemos ajudar a transformar o seu projeto em realidade.
            </p>
          </div>
          
          {/* Contact content */}
          <ContactSection />
        </div>
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
          loading="lazy"
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

export default ContactPage;