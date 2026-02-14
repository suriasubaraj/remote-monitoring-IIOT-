
import React from 'react';
import { 
  Zap, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  BarChart3
} from 'lucide-react';
import { StationData, StationStatus } from '../types';

interface StationMonitoringProps {
  stations: StationData[];
}

const StationMonitoring: React.FC<StationMonitoringProps> = ({ stations }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stations.map((station) => (
        <div key={station.id} className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden flex flex-col hover:border-slate-700 transition-all group">
          <div className="p-6 border-b border-slate-800">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{station.name}</h3>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                station.status === StationStatus.RUNNING ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
                station.status === StationStatus.IDLE ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
              }`}>
                {station.status}
              </span>
            </div>
            <p className="text-sm text-slate-400 flex items-center gap-1.5 font-medium">
              <Cpu size={14} className="text-blue-500" />
              {station.description}
            </p>
          </div>
          
          <div className="p-6 grid grid-cols-3 gap-4 flex-1 bg-slate-900/50">
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 flex items-center gap-1.5 uppercase font-bold tracking-tight">
                <BarChart3 size={10} className="text-slate-600" /> Throughput
              </p>
              <p className="text-base font-bold text-slate-100">{station.throughput} <span className="text-[10px] font-normal text-slate-500 italic">p/h</span></p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] text-slate-500 flex items-center gap-1.5 uppercase font-bold tracking-tight">
                <CheckCircle2 size={10} className="text-slate-600" /> Accuracy
              </p>
              <p className="text-base font-bold text-slate-100">{station.accuracy.toFixed(1)}%</p>
            </div>
            <div className="space-y-1 text-right">
              <p className="text-[10px] text-slate-500 flex items-center justify-end gap-1.5 uppercase font-bold tracking-tight">
                <Zap size={10} className="text-slate-600" /> Energy
              </p>
              <p className="text-base font-bold text-slate-100">{station.energyConsumption.toFixed(1)} <span className="text-[10px] font-normal text-slate-500 italic">kWh</span></p>
            </div>
          </div>
          
          <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <Clock size={14} />
              <span>Maint: {station.lastMaintenance}</span>
            </div>
            <button className="text-blue-400 text-xs font-bold hover:text-blue-300 transition-colors">Details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StationMonitoring;
