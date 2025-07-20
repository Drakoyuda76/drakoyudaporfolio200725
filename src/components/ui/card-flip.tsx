import { useState } from 'react';
import { ArrowRight, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getStatusLabel, getStatusColor, getBusinessAreaLabel } from '@/data/solutions';
import type { Solution } from '@/types/solution';

interface CardFlipProps {
  solution: Solution;
  index: number;
}

const CardFlip = ({ solution, index }: CardFlipProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group perspective-1000 h-[400px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
        isFlipped ? 'rotate-y-180' : ''
      }`}>
        {/* Front */}
        <Card className="absolute inset-0 w-full h-full backface-hidden border-border/40 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:shadow-xl transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between">
              <Badge variant={getStatusColor(solution.status) as any}>
                {getStatusLabel(solution.status)}
              </Badge>
              <div className="flex flex-wrap gap-1">
                {solution.businessAreaImpact.slice(0, 2).map(area => (
                  <Badge key={area} variant="outline" className="text-xs bg-accent/5">
                    {getBusinessAreaLabel(area).split(' ')[0]}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <CardTitle className="font-tomorrow text-xl text-foreground group-hover:text-accent transition-colors">
                {solution.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground mt-2">
                {solution.subtitle}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
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
          </CardContent>
        </Card>

        {/* Back */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 border-border/40 bg-gradient-to-br from-accent/10 to-accent/5 backdrop-blur-sm">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="font-tomorrow font-semibold text-lg text-foreground">
                {solution.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
                {solution.description.length > 150 
                  ? `${solution.description.substring(0, 150)}...`
                  : solution.description
                }
              </p>
            </div>

            <Link to={`/solucoes/${solution.id}`} className="mt-4">
              <Button 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium group/btn"
              >
                Saber Mais
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CardFlip;