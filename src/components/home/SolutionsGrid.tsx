import { useState, useEffect } from 'react';
import { Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getStatusLabel, getBusinessAreaLabel } from '@/data/solutions';
import SolutionCard from '@/components/ui/solution-card';
import { supabase } from '@/integrations/supabase/client';
import type { SolutionStatus, BusinessArea, Solution } from '@/types/solution';

const SolutionsGrid = () => {
  const [statusFilter, setStatusFilter] = useState<SolutionStatus | 'all'>('all');
  const [businessAreaFilter, setBusinessAreaFilter] = useState<BusinessArea | 'all'>('all');
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSolutions();
  }, []);

  const loadSolutions = async () => {
    try {
      const { data, error } = await supabase
        .from('solucoes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Load solutions and their associated images
      const formattedSolutions: Solution[] = await Promise.all((data || []).map(async (solucao) => {
        // Load demonstration images for this solution
        const { data: imagesData } = await supabase
          .from('solucao_imagens')
          .select('imagem_url')
          .eq('solucao_id', solucao.id)
          .order('created_at', { ascending: true });

        const imageUrls = imagesData?.map(img => img.imagem_url) || [];

        return {
          id: solucao.id,
          title: solucao.title,
          subtitle: solucao.subtitle,
          description: solucao.description,
          status: solucao.status as SolutionStatus,
          businessAreaImpact: solucao.business_area_impact as BusinessArea[],
          problemSolution: solucao.problem_solution || '',
          humanImpact: solucao.human_impact || '',
          sustainabilityImpact: solucao.sustainability_impact || '',
          sdgGoals: solucao.sdg_goals || [],
          timesSaved: solucao.times_saved || 0,
          usersImpacted: solucao.users_impacted || 0,
          images: imageUrls.map((url, index) => ({
            id: `${index + 1}`,
            title: `Imagem ${index + 1}`,
            description: `Demonstração da ${solucao.title}`,
            colorScheme: `from-blue-${500 + index * 100} to-blue-${600 + index * 100}`
          })),
          createdAt: new Date(solucao.created_at),
          updatedAt: new Date(solucao.updated_at)
        };
      }));

      setSolutions(formattedSolutions);
    } catch (error) {
      console.error('Erro ao carregar soluções:', error);
    } finally {
      setLoading(false);
    }
  };

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

        {/* Solutions Grid - Modern Card Layout */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">A carregar soluções...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSolutions.map((solution, index) => (
              <SolutionCard
                key={solution.id}
                solution={solution}
                index={index}
              />
            ))}
          </div>
        )}

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