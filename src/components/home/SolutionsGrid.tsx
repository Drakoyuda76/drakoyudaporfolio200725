import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ArrowRight, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSolutions, getStatusLabel, getStatusColor, getBusinessAreaLabel } from '@/data/solutions';
import type { SolutionStatus, BusinessArea } from '@/types/solution';

const SolutionsGrid = () => {
  const [statusFilter, setStatusFilter] = useState<SolutionStatus | 'all'>('all');
  const [businessAreaFilter, setBusinessAreaFilter] = useState<BusinessArea | 'all'>('all');
  const solutions = getSolutions();

  const filteredSolutions = solutions.filter(solution => {
    const statusMatch = statusFilter === 'all' || solution.status === statusFilter;
    const businessAreaMatch = businessAreaFilter === 'all' || 
      solution.businessAreaImpact.includes(businessAreaFilter);
    return statusMatch && businessAreaMatch;
  });

  const allStatuses: (SolutionStatus | 'all')[] = ['all', 'live', 'parceria', 'teste-usuarios', 'prototipo', 'teste-convite', 'conceito'];
  const allBusinessAreas: (BusinessArea | 'all')[] = ['all', 'front-office', 'back-office', 'core-capabilities', 'products-services'];

  return (
    <section id="solucoes" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="font-tomorrow font-semibold text-3xl md:text-4xl text-foreground">
            As Nossas Soluções
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada micro solução é desenvolvida para resolver problemas específicos da realidade angolana, 
            combinando inovação tecnológica com sensibilidade cultural.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card/50 rounded-xl border border-border/40">
          <div className="flex items-center space-x-2 flex-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filtros:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as SolutionStatus | 'all')}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status da Solução" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {allStatuses.slice(1).map(status => (
                  <SelectItem key={status} value={status}>
                    {getStatusLabel(status)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={businessAreaFilter} onValueChange={(value) => setBusinessAreaFilter(value as BusinessArea | 'all')}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Área de Negócio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Áreas</SelectItem>
                {allBusinessAreas.slice(1).map(area => (
                  <SelectItem key={area} value={area}>
                    {getBusinessAreaLabel(area)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSolutions.map((solution, index) => (
            <Card 
              key={solution.id} 
              className="group hover:shadow-hover transition-all duration-300 border-border/40 bg-card/50 hover:bg-card/80 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-3">
                <div className="flex items-start justify-between">
                  <Badge 
                    variant={getStatusColor(solution.status) as any}
                  >
                    {getStatusLabel(solution.status)}
                  </Badge>
                  <div className="flex flex-wrap gap-1">
                    {solution.businessAreaImpact.slice(0, 2).map(area => (
                      <Badge key={area} variant="outline" className="text-xs">
                        {getBusinessAreaLabel(area).split(' ')[0]}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <CardTitle className="font-tomorrow text-xl text-foreground group-hover:text-accent transition-colors">
                    {solution.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {solution.subtitle}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {solution.description}
                </p>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{solution.timesSaved.toLocaleString()}h poupadas</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3" />
                    <span>{solution.usersImpacted} utilizadores</span>
                  </div>
                </div>

                <Link to={`/solucoes/${solution.id}`}>
                  <Button 
                    variant="outline" 
                    className="w-full group/btn border-accent/30 text-accent hover:bg-accent/10"
                  >
                    Saber Mais
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSolutions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma solução encontrada com os filtros selecionados.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setStatusFilter('all');
                setBusinessAreaFilter('all');
              }}
              className="mt-4"
            >
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SolutionsGrid;