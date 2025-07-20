import Header from '@/components/layout/Header';
import HeroSection from '@/components/home/HeroSection';
import SolutionsGrid from '@/components/home/SolutionsGrid';
import AboutSection from '@/components/home/AboutSection';
import ContactSection from '@/components/home/ContactSection';
import ScrollToTop from '@/components/ui/scroll-to-top';

const Index = () => {
  return (
    <div className="min-h-screen bg-background font-tomorrow">
      <Header />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <section id="solucoes">
          <SolutionsGrid />
        </section>
        <section id="sobre">
          <AboutSection />
        </section>
        <section id="contacto">
          <ContactSection />
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
      
      <ScrollToTop />
    </div>
  );
};

export default Index;
