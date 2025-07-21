import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

const MetricCard = ({ value, label, description, icon: Icon }: MetricCardProps) => {
  return (
    <div className="group bg-card/50 border border-border rounded-xl p-8 text-center hover:bg-card/80 transition-all duration-300 hover:shadow-lg">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      
      <div className="space-y-2">
        <div className="heading-primary text-primary">{value}</div>
        <div className="heading-tertiary">{label}</div>
        <p className="body-regular text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default MetricCard;