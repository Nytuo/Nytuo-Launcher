import { Clock, Trophy, Calendar, Tag } from 'lucide-react';

interface InfoCardProps {
  icon: 'clock' | 'trophy' | 'calendar' | 'tag';
  color: 'green' | 'orange' | 'red' | 'blue';
  title: string;
  description: string | number;
}

export function InfoCard({ icon, color, title, description }: InfoCardProps) {
  const Icon = {
    clock: Clock,
    trophy: Trophy,
    calendar: Calendar,
    tag: Tag,
  }[icon];

  const colors = {
    green: 'text-green-500 bg-green-500/10',
    orange: 'text-orange-500 bg-orange-500/10',
    red: 'text-red-500 bg-red-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border bg-muted/20 p-4">
      <div className={`rounded-lg p-3 ${colors[color]}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
        <p className="text-lg font-bold">{description}</p>
      </div>
    </div>
  );
}
