import React from 'react';
import { cn } from '@/lib/utils';

interface SDGIconProps {
  sdgNumber: number;
  size?: string;
  className?: string;
  showTooltip?: boolean;
}

const SDGIcon: React.FC<SDGIconProps> = ({ 
  sdgNumber, 
  size = "w-12 h-12", 
  className = "",
  showTooltip = true 
}) => {
  const sdgData: Record<number, { name: string; color: string; }> = {
    1: { name: "Erradicação da Pobreza", color: "#E5243B" },
    3: { name: "Saúde e Bem-Estar", color: "#4C9F38" },
    4: { name: "Educação de Qualidade", color: "#C5192D" },
    8: { name: "Trabalho Digno e Crescimento Económico", color: "#A21942" },
    9: { name: "Indústria, Inovação e Infraestrutura", color: "#FD6925" },
    10: { name: "Redução das Desigualdades", color: "#DD1367" },
    11: { name: "Cidades e Comunidades Sustentáveis", color: "#FD9D24" },
    13: { name: "Ação Climática", color: "#3F7E44" },
    16: { name: "Paz, Justiça e Instituições Eficazes", color: "#00689D" },
  };

  const sdg = sdgData[sdgNumber];
  
  if (!sdg) return null;

  return (
    <div 
      className={cn(
        `${size} relative group cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10`,
        className
      )}
      title={showTooltip ? `ODS ${sdgNumber}: ${sdg.name}` : undefined}
    >
      {/* SDG Icon - Simplified colored square with number */}
      <div 
        className="w-full h-full rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300 flex items-center justify-center text-white font-bold text-lg relative overflow-hidden"
        style={{ backgroundColor: sdg.color }}
      >
        <span className="drop-shadow-lg z-10">{sdgNumber}</span>
        
        {/* 3D hover effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
      </div>
      
      {/* Tooltip on hover */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 pointer-events-none">
          ODS {sdgNumber}: {sdg.name}
        </div>
      )}
    </div>
  );
};

export default SDGIcon;