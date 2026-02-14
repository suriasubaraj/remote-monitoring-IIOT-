
import React from 'react';
import { 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  Activity, 
  Zap 
} from 'lucide-react';
import { KPIMetrics } from '../types';

interface KPISectionProps {
  metrics: KPIMetrics;
}

const KPISection: React.FC<KPISectionProps> = ({ metrics }) => {
  const cards = [
    { 
      label: 'Pairs Produced Today', 
      value: metrics.totalPairs.toLocaleString(), 
      change: '+12% from yesterday', 
      icon: TrendingUp, 
      color: 'blue' 
    },
    { 
      label: 'Target Progress', 
      value: `${metrics.targetAchieved.toFixed(1)}%`, 
      change: 'On track for 15k', 
      icon: Target, 
      color: 'emerald' 
    },
    { 
      label: 'Defect Rate', 
      value: `${metrics.defectRate.toFixed(1)}%`, 
      change: '-0.2% from shift start', 
      icon: AlertTriangle, 
      color: 'amber' 
    },
    { 
      label: 'Machine Utilization', 
      value: `${metrics.utilization.toFixed(1)}%`, 
      change: 'Normal operations', 
      icon: Activity, 
      color: 'indigo' 
    },
    { 
      label: 'Active AI Stations', 
      value: `${metrics.activeStations} / 5`, 
      change: '1 Idle - Packing', 
      icon: Zap, 
      color: 'purple' 
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm hover:border-slate-700 transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-xl bg-slate-800 text-${card.color}-400 border border-slate-700 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-colors`}>
              <card.icon size={22} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">Real-time</span>
          </div>
          <div>
            <h3 className="text-slate-400 text-sm font-medium mb-1">{card.label}</h3>
            <p className="text-2xl font-bold text-white tracking-tight">{card.value}</p>
            <p className={`text-xs mt-2 font-medium ${card.change.includes('+') || card.change.includes('On track') ? 'text-blue-400' : 'text-slate-500'}`}>
              {card.change}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPISection;
