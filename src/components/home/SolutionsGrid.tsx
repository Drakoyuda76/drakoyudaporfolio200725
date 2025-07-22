import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSolutions, getStatusLabel, getBusinessAreaLabel } from '@/data/solutions';
import SolutionCard from '@/components/ui/solution-card';
import type { SolutionStatus, BusinessArea } from '@/types/solution';
const SolutionsGrid = () => {
  const [statusFilter, setStatusFilter] = useState<SolutionStatus | 'all'>('all');
  const [businessAreaFilter, setBusinessAreaFilter] = useState<BusinessArea | 'all'>('all');
  const solutions = getSolutions();
  const filteredSolutions = solutions.filter(solution => {
    const statusMatch = statusFilter === 'all' || solution.status === statusFilter;
    const businessAreaMatch = businessAreaFilter === 'all' || solution.businessAreaImpact.includes(businessAreaFilter);
    return statusMatch && businessAreaMatch;
  });
  const allStatuses: (SolutionStatus | 'all')[] = ['all', 'live', 'parceria', 'teste-usuarios', 'prototipo', 'teste-convite', 'conceito'];
  const allBusinessAreas: (BusinessArea | 'all')[] = ['all', 'front-office', 'back-office', 'core-capabilities', 'products-services'];
  return <section id="solucoes" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card/50 rounded-xl border border-border/40">
          <div className="flex items-center space-x-2 flex-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filtros:</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Select value={statusFilter} onValueChange={value => setStatusFilter(value as SolutionStatus | 'all')}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Status da Solução" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {allStatuses.slice(1).map(status => <SelectItem key={status} value={status}>
                    {getStatusLabel(status)}
                  </SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={businessAreaFilter} onValueChange={value => setBusinessAreaFilter(value as BusinessArea | 'all')}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Área de Negócio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Áreas</SelectItem>
                {allBusinessAreas.slice(1).map(area => <SelectItem key={area} value={area}>
                    {getBusinessAreaLabel(area)}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Solutions Grid - Modern Card Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSolutions.map((solution, index) => <SolutionCard key={solution.id} solution={solution} index={index} />)}
        </div>

        {filteredSolutions.length === 0 && <div className="text-center py-12">
            <p className="text-muted-foreground">
              Nenhuma solução encontrada com os filtros selecionados.
            </p>
            <Button variant="outline" onClick={() => {
          setStatusFilter('all');
          setBusinessAreaFilter('all');
        }} className="mt-4">
              Limpar Filtros
            </Button>
          </div>}
      </div>
    </section>;
};
export default SolutionsGrid;