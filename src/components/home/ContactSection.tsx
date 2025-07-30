import { useState, useEffect } from 'react';
import { Mail, MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';

const ContactSection = () => {
  const [contactInfo, setContactInfo] = useState({
    email_geral: 'drakoyuda76@gmail.com',
    email_parcerias: 'drakoyuda76@gmail.com'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('empresa_contactos')
        .select('*')
        .maybeSingle();

      if (error) {
        console.error('Erro ao carregar informações de contacto:', error);
        return;
      }

      if (data) {
        setContactInfo({
          email_geral: data.email_geral || 'drakoyuda76@gmail.com',
          email_parcerias: data.email_parcerias || 'drakoyuda76@gmail.com'
        });
      }
    } catch (error) {
      console.error('Erro ao carregar informações de contacto:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-accent/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-tomorrow font-semibold text-3xl md:text-4xl text-foreground">
              Vamos Criar Juntos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tem um desafio que acredita poder ser resolvido com IA? Vamos conversar sobre 
              como podemos desenvolver uma solução pensada especificamente para a realidade angolana.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Main Contact Card */}
            <Card className="border-accent/30 bg-gradient-to-br from-accent/10 to-accent/5 shadow-hover">
              <CardHeader className="text-center space-y-3">
                <div className="mx-auto w-16 h-16 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Mail className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="text-xl font-tomorrow">Contacto Direto</CardTitle>
                <CardDescription>
                  Fale diretamente connosco para discutir as suas necessidades e como podemos ajudar.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg border border-accent/20">
                  <p className="text-sm text-foreground">
                    <strong>Email:</strong> {contactInfo.email_geral}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Resposta típica em 24 horas
                  </p>
                </div>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Iniciar Conversa
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contactar DrakoYuda Soluções</DialogTitle>
                      <DialogDescription>
                        Estamos prontos para discutir como as nossas soluções de IA podem 
                        beneficiar o seu projeto ou organização.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <h4 className="font-medium text-foreground mb-2">Como podemos ajudar?</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• Consultoria em soluções de IA personalizadas</li>
                          <li>• Parcerias para desenvolvimento de micro soluções</li>
                          <li>• Implementação de soluções existentes</li>
                          <li>• Formação e capacitação em IA</li>
                        </ul>
                      </div>
                      
                      <div className="p-4 bg-card rounded-lg border border-border/40">
                        <p className="text-sm text-foreground">
                          <strong>Email:</strong> {contactInfo.email_geral}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Por favor, inclua informações sobre o seu projeto ou necessidades específicas.
                        </p>
                      </div>
                      
                      <Button asChild className="w-full">
                        <a href={`mailto:${contactInfo.email_geral}?subject=Interesse em Soluções de IA - DrakoYuda`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Abrir Cliente de Email
                        </a>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Partnership Card */}
            <Card className="border-border/40 bg-card/50 hover:bg-card/80 transition-all duration-300">
              <CardHeader className="space-y-3">
                <CardTitle className="text-xl font-tomorrow">Parcerias & Colaborações</CardTitle>
                <CardDescription>
                  Procuramos parceiros estratégicos que partilhem a nossa visão de 
                  democratizar a IA em Angola.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm">Organizações</h4>
                      <p className="text-xs text-muted-foreground">
                        ONGs, empresas e instituições públicas
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm">Investidores</h4>
                      <p className="text-xs text-muted-foreground">
                        Interessados em inovação tecnológica angolana
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm">Desenvolvedores</h4>
                      <p className="text-xs text-muted-foreground">
                        Talentos angolanos em IA e tecnologia
                      </p>
                    </div>
                  </div>
                </div>

                <Button variant="outline" className="w-full border-accent/30 text-accent hover:bg-accent/10">
                  Saber Mais sobre Parcerias
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-impact rounded-full border border-accent/20">
              <span className="text-sm text-muted-foreground">
                <strong className="text-foreground">Pessoas como nós, fazem coisas assim.</strong> 
                {' '}Vamos fazer a diferença juntos.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;