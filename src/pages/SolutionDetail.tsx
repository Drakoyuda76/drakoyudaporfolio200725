import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Target, Globe, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/layout/Header';
import ImageCarousel from '@/components/solution/ImageCarousel';
import SDGIcon from '@/components/ui/sdg-icon';
import { getSolutions, getStatusLabel, getStatusColor, getBusinessAreaLabel } from '@/data/solutions';

const SolutionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const solutions = getSolutions();
  const solution = solutions.find(s => s.id === id);

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
      if (process.env.NODE_ENV === 'development') {
        console.error('Date formatting error:', error);
      }
      return 'Data não disponível';
    }
  };

  if (!solution) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-tomorrow font-semibold text-foreground mb-4">
            Solução não encontrada
          </h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Início
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
          <span className="text-foreground">{solution.title}</span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link to="/">
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
                <ImageCarousel images={solution.images} solutionTitle={solution.title} />
              </CardContent>
            </Card>

            {/* Problem & Solution */}
            <Card className="border-border/40 bg-card/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-tomorrow flex items-center">
                  <div className="mr-4 p-2 rounded-lg bg-accent/10">
                    <Target className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <span className="text-foreground">Problema & Solução</span>
                    <p className="text-sm text-muted-foreground font-normal mt-1">
                      Desafio identificado e abordagem implementada
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {solution.problemSolution}
                </p>
              </CardContent>
            </Card>

            {/* Human Impact */}
            <Card className="border-border/40 bg-card/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-tomorrow flex items-center">
                  <div className="mr-4 p-2 rounded-lg bg-accent/10">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <span className="text-foreground">Impacto Humano & Benefícios</span>
                    <p className="text-sm text-muted-foreground font-normal mt-1">
                      Como esta solução beneficia pessoas e comunidades
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {solution.humanImpact}
                </p>
              </CardContent>
            </Card>

            {/* Sustainability Impact */}
            <Card className="border-border/40 bg-card/50 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-tomorrow flex items-center">
                  <div className="mr-4 p-2 rounded-lg bg-accent/10">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <span className="text-foreground">Impacto & Sustentabilidade</span>
                    <p className="text-sm text-muted-foreground font-normal mt-1">
                      Contribuição para o desenvolvimento sustentável
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 space-y-6">
                <p className="text-muted-foreground leading-relaxed text-base">
                  {solution.sustainabilityImpact}
                </p>
                
                <div className="pt-4 border-t border-border/50">
                  <h4 className="font-semibold text-foreground mb-4 flex items-center">
                    <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                    Objetivos de Desenvolvimento Sustentável (ODS)
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {solution.sdgGoals.map(goal => (
                      <SDGIcon 
                        key={goal} 
                        goalNumber={goal} 
                        size="md"
                        className="hover:scale-110 transition-transform duration-200"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-3">
                    Esta solução contribui diretamente para {solution.sdgGoals.length} dos 17 Objetivos de Desenvolvimento Sustentável da ONU.
                  </p>
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