
import React from 'react';
import { AlertCircle, ArrowRight, BrainCircuit, ShieldAlert, Zap } from 'lucide-react';
import { Alert } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
          <BrainCircuit size={20} />
        </div>
        <h3 className="font-bold text-white text-lg">AI Smart Advisor</h3>
      </div>
      
      <div className="space-y-4 flex-1">
        {alerts.map((alert) => (
          <div key={alert.id} className="bg-slate-800/40 border border-slate-700 p-4 rounded-xl flex gap-4 hover:bg-slate-800/60 transition-colors">
            <div className={`mt-1 p-1.5 rounded-lg shrink-0 ${
              alert.type === 'error' ? 'bg-red-500/10 text-red-400' :
              alert.type === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-blue-500/10 text-blue-400'
            }`}>
              {alert.type === 'error' ? <ShieldAlert size={16} /> : 
               alert.type === 'warning' ? <AlertCircle size={16} /> : <Zap size={16} />}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-sm font-bold text-slate-100 leading-tight">{alert.message}</h4>
                <span className="text-[10px] text-slate-500 font-medium whitespace-nowrap ml-2">{alert.timestamp}</span>
              </div>
              <div className="bg-slate-900/50 p-3 mt-3 rounded-lg border border-slate-700/50 group">
                <p className="text-xs text-blue-300 font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                  <BrainCircuit size={10} /> AI RECOMMENDATION
                </p>
                <p className="text-xs text-slate-400 leading-relaxed mb-2">
                  {alert.recommendation}
                </p>
                <button className="flex items-center gap-1.5 text-xs text-blue-400 font-bold hover:text-blue-300 transition-colors">
                  EXECUTE AUTO-PATCH <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-800 flex justify-center">
        <button className="text-sm text-slate-400 font-bold hover:text-white transition-colors">View All Logs</button>
      </div>
    </div>
  );
};

export default AlertsPanel;
