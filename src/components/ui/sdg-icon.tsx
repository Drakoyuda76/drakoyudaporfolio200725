import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SDGIconProps {
  goalNumber: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SDGIcon: React.FC<SDGIconProps> = ({ goalNumber, size = 'md', className = '' }) => {
  const sdgData = {
    1: { 
      title: 'ODS 1: Erradicação da Pobreza',
      color: '#e5243b',
      description: 'Acabar com a pobreza em todas as suas formas, em todos os lugares'
    },
    3: { 
      title: 'ODS 3: Saúde e Bem-Estar',
      color: '#4c9f38',
      description: 'Assegurar uma vida saudável e promover o bem-estar para todos, em todas as idades'
    },
    4: { 
      title: 'ODS 4: Educação de Qualidade',
      color: '#c5192d',
      description: 'Assegurar a educação inclusiva e equitativa e de qualidade, e promover oportunidades de aprendizagem ao longo da vida para todos'
    },
    8: { 
      title: 'ODS 8: Trabalho Digno e Crescimento Económico',
      color: '#a21942',
      description: 'Promover o crescimento económico sustentado, inclusivo e sustentável, emprego pleno e produtivo e trabalho digno para todos'
    },
    9: { 
      title: 'ODS 9: Indústria, Inovação e Infraestrutura',
      color: '#fd6925',
      description: 'Construir infraestruturas resilientes, promover a industrialização inclusiva e sustentável e fomentar a inovação'
    },
    10: { 
      title: 'ODS 10: Redução das Desigualdades',
      color: '#dd1367',
      description: 'Reduzir a desigualdade dentro dos países e entre eles'
    },
    11: { 
      title: 'ODS 11: Cidades e Comunidades Sustentáveis',
      color: '#fd9d24',
      description: 'Tornar as cidades e os assentamentos humanos inclusivos, seguros, resilientes e sustentáveis'
    },
    13: { 
      title: 'ODS 13: Ação Climática',
      color: '#3f7e44',
      description: 'Tomar medidas urgentes para combater a mudança climática e seus impactos'
    },
    16: { 
      title: 'ODS 16: Paz, Justiça e Instituições Eficazes',
      color: '#02558b',
      description: 'Promover sociedades pacíficas e inclusivas para o desenvolvimento sustentável, proporcionar o acesso à justiça para todos e construir instituições eficazes, responsáveis e inclusivas em todos os níveis'
    }
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };

  const data = sdgData[goalNumber as keyof typeof sdgData];
  
  if (!data) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`${sizeClasses[size]} ${className} cursor-help`}>
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              style={{ backgroundColor: data.color }}
            >
              {/* Background circle */}
              <rect width="100" height="100" fill={data.color} />
              
              {/* White circle for number */}
              <circle
                cx="50"
                cy="30"
                r="18"
                fill="white"
              />
              
              {/* SDG number */}
              <text
                x="50"
                y="36"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                fill={data.color}
                fontFamily="Tomorrow, sans-serif"
              >
                {goalNumber}
              </text>
              
              {/* Bottom decorative element */}
              <rect
                x="15"
                y="55"
                width="70"
                height="35"
                fill="white"
                fillOpacity="0.9"
                rx="3"
              />
              
              {/* Mini icon placeholder */}
              <circle
                cx="30"
                cy="70"
                r="6"
                fill={data.color}
                fillOpacity="0.7"
              />
              <circle
                cx="50"
                cy="70"
                r="6"
                fill={data.color}
                fillOpacity="0.7"
              />
              <circle
                cx="70"
                cy="70"
                r="6"
                fill={data.color}
                fillOpacity="0.7"
              />
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs p-3">
          <div className="space-y-1">
            <p className="font-semibold text-sm">{data.title}</p>
            <p className="text-xs text-muted-foreground">{data.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SDGIcon;