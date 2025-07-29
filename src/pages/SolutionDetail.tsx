import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Users, Target, Globe, Mail, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/layout/Header';
import ImageCarousel from '@/components/solution/ImageCarousel';
import { getStatusLabel, getStatusColor, getBusinessAreaLabel } from '@/data/solutions';
import { supabase } from '@/integrations/supabase/client';
import type { Solution, SolutionStatus, BusinessArea } from '@/types/solution';

const SolutionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [solution, setSolution] = useState<Solution | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadSolution();
    }
  }, [id]);

  const loadSolution = async () => {
    try {
      // Load solution data
      const { data, error } = await supabase
        .from('solucoes')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        // Load demonstration images from solucao_imagens table
        const { data: imagesData, error: imagesError } = await supabase
          .from('solucao_imagens')
          .select('imagem_url')
          .eq('solucao_id', id)
          .order('created_at', { ascending: true });

        if (imagesError) {
          console.error('Error loading images:', imagesError);
        }

        const imageUrls = imagesData?.map(img => img.imagem_url) || [];
        setImages(imageUrls);

        const formattedSolution: Solution = {
          id: data.id,
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          status: data.status as SolutionStatus,
          businessAreaImpact: data.business_area_impact as BusinessArea[],
          problemSolution: data.problem_solution || '',
          humanImpact: data.human_impact || '',
          sustainabilityImpact: data.sustainability_impact || '',
          sdgGoals: data.sdg_goals || [],
          timesSaved: data.times_saved || 0,
          usersImpacted: data.users_impacted || 0,
          
          images: imageUrls.map((url, index) => ({
            id: `${index + 1}`,
            title: `Imagem ${index + 1}`,
            description: `Demonstração da ${data.title}`,
            colorScheme: `from-blue-${500 + index * 100} to-blue-${600 + index * 100}`
          })),
          createdAt: new Date(data.created_at),
          updatedAt: new Date(data.updated_at)
        };

        setSolution(formattedSolution);
      }
    } catch (error) {
      console.error('Erro ao carregar solução:', error);
    } finally {
      setLoading(false);
    }
  };

  // Safe date formatting function
  const formatDate = (dateValue: string | Date | undefined) => {
    if (!dateValue) return 'Data não disponível';
    
    try {
      // Handle both string and Date object cases
      const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
      
      // Validate date is valid
      if (isNaN(date.getTime())) {
        return 'Data inválida';
      }
      
      return date.toLocaleDateString('pt-AO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Data não disponível';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="mt-4 text-muted-foreground">A carregar solução...</p>
        </div>
      </div>
    );
  }

  if (!solution) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-tomorrow font-semibold text-foreground mb-4">
            Solução não encontrada
          </h1>
          <Link to="/solucoes">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar às Soluções
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const sdgDescriptions = {
    1: 'Erradicação da Pobreza',
    3: 'Saúde e Bem-Estar',
    4: 'Educação de Qualidade',
    8: 'Trabalho Digno e Crescimento Económico',
    9: 'Indústria, Inovação e Infraestrutura',
    10: 'Redução das Desigualdades',
    11: 'Cidades e Comunidades Sustentáveis',
    13: 'Ação Climática',
    16: 'Paz, Justiça e Instituições Eficazes',
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-accent transition-colors">Início</Link>
          <span>/</span>
          <Link to="/solucoes" className="hover:text-accent transition-colors">Soluções</Link>
          <span>/</span>
          <span className="text-foreground">{solution.title}</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link to="/solucoes">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar às Soluções
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <Badge 
                  variant={getStatusColor(solution.status) as any}
                >
                  {getStatusLabel(solution.status)}
                </Badge>
                <div className="flex flex-wrap gap-2">
                  {solution.businessAreaImpact.map(area => (
                    <Badge key={area} variant="outline" className="text-xs">
                      {getBusinessAreaLabel(area)}
                    </Badge>
                  ))}
                </div>
              </div>

              <h1 className="font-tomorrow font-semibold text-3xl md:text-4xl text-foreground">
                {solution.title}
              </h1>
              <p className="text-lg text-accent font-medium">
                {solution.subtitle}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {solution.description}
              </p>
            </div>

            {/* Image Carousel */}
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl font-tomorrow">Demonstração Visual</CardTitle>
                <CardDescription>
                  Explore as diferentes interfaces e funcionalidades da solução
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageCarousel images={images} solutionTitle={solution.title} />
              </CardContent>
            </Card>

            {/* Problem & Solution */}
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl font-tomorrow flex items-center">
                  <Target className="mr-2 h-5 w-5 text-accent" />
                  Problema & Solução
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.problemSolution}
                </p>
              </CardContent>
            </Card>

            {/* Human Impact */}
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl font-tomorrow flex items-center">
                  <Users className="mr-2 h-5 w-5 text-accent" />
                  Impacto Humano & Benefícios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.humanImpact}
                </p>
              </CardContent>
            </Card>

            {/* Sustainability Impact */}
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-xl font-tomorrow flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-accent" />
                  Impacto & Sustentabilidade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {solution.sustainabilityImpact}
                </p>
                
                <div>
                  <h4 className="font-medium text-foreground mb-3">Objetivos de Desenvolvimento Sustentável (ODS):</h4>
                  <div className="flex flex-wrap gap-2">
                    {solution.sdgGoals.map(goal => (
                      <div 
                        key={goal}
                        className="flex items-center space-x-2 px-3 py-2 bg-accent/10 border border-accent/20 rounded-lg"
                      >
                        <div className="w-6 h-6 bg-accent text-accent-foreground rounded text-xs font-bold flex items-center justify-center">
                          {goal}
                        </div>
                        <span className="text-sm text-foreground">
                          {sdgDescriptions[goal as keyof typeof sdgDescriptions]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Impact Metrics */}
            <Card className="border-border/40 bg-card/50">
              <CardHeader>
                <CardTitle className="text-lg font-tomorrow">Métricas de Impacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Horas Poupadas</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {solution.timesSaved.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-accent" />
                      <span className="text-sm text-muted-foreground">Utilizadores</span>
                    </div>
                    <span className="font-semibold text-foreground">
                      {solution.usersImpacted.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Última atualização: {formatDate(solution.updatedAt)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardHeader>
                <CardTitle className="text-lg font-tomorrow">Interessado nesta solução?</CardTitle>
                <CardDescription>
                  Entre em contacto connosco para saber mais sobre como implementar esta solução.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      Contactar Agora
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Contactar DrakoYuda</DialogTitle>
                      <DialogDescription>
                        Para saber mais sobre a solução "{solution.title}", por favor contacte-nos diretamente.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                        <p className="text-sm text-foreground">
                          <strong>Email:</strong> drakoyuda76@gmail.com
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Mencione a solução "{solution.title}" no seu email para um atendimento mais rápido.
                        </p>
                      </div>
                      <Button asChild className="w-full">
                        <a href={`mailto:drakoyuda76@gmail.com?subject=Interesse na solução: ${solution.title}`}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Abrir Cliente de Email
                        </a>
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SolutionDetail;