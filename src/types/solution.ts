export type SolutionStatus = 
  | 'teste-convite' 
  | 'prototipo' 
  | 'parceria' 
  | 'live' 
  | 'conceito' 
  | 'teste-usuarios';

export type BusinessArea = 
  | 'front-office' 
  | 'back-office' 
  | 'core-capabilities' 
  | 'products-services';

export interface SolutionImage {
  id: string;
  title: string;
  description: string;
  colorScheme: string;
}

export interface Solution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: SolutionStatus;
  businessAreaImpact: BusinessArea[];
  problemSolution: string;
  humanImpact: string;
  sustainabilityImpact: string;
  sdgGoals: number[];
  images: SolutionImage[];
  timesSaved: number; // em horas
  usersImpacted: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ImpactMetrics {
  totalHoursSaved: number;
  totalUsers: number;
  activeSolutions: number;
  partnerships: number;
  errorReduction?: number;
  responseTimeReduction?: number;
  communitiesImpacted?: number;
  financialLiteracyIncrease?: number;
}

export interface SDGAlignment {
  goal: number;
  title: string;
  solutionsCount: number;
}

export interface BusinessAreaStats {
  area: BusinessArea;
  label: string;
  solutionsCount: number;
}