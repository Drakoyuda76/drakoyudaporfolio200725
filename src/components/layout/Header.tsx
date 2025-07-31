import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Brain, Users, Target, Mail, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { supabase } from '@/integrations/supabase/client';
import PinModal from '@/components/admin/PinModal';
import drakoLogo from '@/assets/drakoyuda_simbolo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Verificar se o administrador está logado
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(session?.user?.email === 'drakoyuda76@gmail.com');
    };
    
    checkAdminStatus();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAdmin(session?.user?.email === 'drakoyuda76@gmail.com');
    });
    
    return () => subscription.unsubscribe();
  }, []);

  const navItems = [
    { href: '/', label: 'Início', icon: Brain, isScroll: false },
    { href: '/solucoes', label: 'Soluções', icon: Target, isScroll: false },
    { href: '/sobre', label: 'Sobre Nós', icon: Users, isScroll: false },
    { href: '/contacto', label: 'Contacto', icon: Mail, isScroll: false },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setIsMenuOpen(false);
    }
  };

  const handleNavClick = (item: any) => {
    if (item.isScroll && item.href.startsWith('#')) {
      const sectionId = item.href.substring(1);
      scrollToSection(sectionId);
    } else {
      navigate(item.href);
      setIsMenuOpen(false);
    }
  };

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.hash === href || location.pathname.includes(href.slice(1));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3 group">
          <div className="relative">
            <img 
              src="/lovable-uploads/eae753cf-d742-4daa-a23d-e1113b1cfa33.png" 
              alt="DrakoYuda Soluções" 
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain transition-transform duration-300 group-hover:scale-110 cursor-pointer rounded-lg"
              onClick={() => setShowPinModal(true)}
            />
            <div className="absolute inset-0 bg-accent/20 rounded-lg scale-0 group-hover:scale-125 transition-transform duration-300" />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-tomorrow font-semibold text-lg text-foreground">
              DrakoYuda Soluções
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">AI Microsolutions e Serviços</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => handleNavClick(item)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? 'bg-accent/10 text-accent border border-accent/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Theme Toggle & CTA Button */}
        <div className="hidden md:flex items-center space-x-4">
          {isAdmin && (
            <Button
              onClick={() => navigate('/admin')}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              🔐 Voltar para Administrador
            </Button>
          )}
          <ThemeToggle />
          <Button 
            variant="outline" 
            size="sm"
            className="border-accent/30 text-accent hover:bg-accent/10"
            onClick={() => navigate('/contacto')}
          >
            Contactar
          </Button>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setShowPinModal(true)}
          >
            Admin
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40 bg-card/95 backdrop-blur">
          <nav className="container py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full text-left ${
                    isActive(item.href)
                      ? 'bg-accent/10 text-accent border border-accent/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-4 border-t border-border/40 space-y-3">
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
              <Button 
                className="w-full justify-center border-accent/30 text-accent hover:bg-accent/10" 
                variant="outline"
                onClick={() => {
                  navigate('/contacto');
                  setIsMenuOpen(false);
                }}
              >
                Contactar
              </Button>
            </div>
          </nav>
        </div>
      )}
      
      <PinModal
        isOpen={showPinModal}
        onClose={() => setShowPinModal(false)}
        onSuccess={() => navigate('/admin')}
      />
    </header>
  );
};

export default Header;