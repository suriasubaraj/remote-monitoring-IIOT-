
import React from 'react';
import { ChevronRight, Box, Scissors, ScissorsLineDashed, Construction, Sparkles, Package, Warehouse } from 'lucide-react';

const ProcessFlow: React.FC = () => {
  const steps = [
    { label: 'Raw Material', count: 4200, icon: Box },
    { label: 'Cutting', count: 3850, icon: Scissors },
    { label: 'Stitching', count: 3600, icon: ScissorsLineDashed },
    { label: 'Sole Attachment', count: 3520, icon: Construction },
    { label: 'Finishing', count: 3480, icon: Sparkles },
    { label: 'Packaging', count: 3400, icon: Package },
    { label: 'Warehouse', count: 12450, icon: Warehouse },
  ];

  return (
    <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-sm overflow-x-auto relative">
      <div className="flex items-center justify-between min-w-[900px]">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center gap-3 relative group z-10">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all border shadow-lg ${
                idx === steps.length - 1 
                  ? 'bg-blue-600 border-blue-400 text-white' 
                  : 'bg-slate-800 border-slate-700 text-slate-400 group-hover:bg-slate-700 group-hover:text-blue-400 group-hover:border-slate-600'
              }`}>
                <step.icon size={24} />
              </div>
              <div className="text-center">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{step.label}</p>
                <p className="text-sm font-bold text-white">{step.count.toLocaleString()}</p>
              </div>
              {idx === 3 && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-500/10 text-amber-500 px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-xl border border-amber-500/20 flex items-center gap-1.5 animate-pulse z-20">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  BOTTLE-NECK
                </div>
              )}
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-1 flex items-center justify-center px-4 relative">
                <div className="w-full h-1 bg-slate-800 rounded-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-blue-400/5 animate-pulse"></div>
                  <div className="absolute top-0 left-0 h-full bg-blue-500/50 w-1/3 animate-[slide_3s_infinite_linear]"></div>
                </div>
                <ChevronRight size={18} className="text-slate-700 ml-2" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <style>{`
        @keyframes slide {
          from { transform: translateX(-100%); }
          to { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default ProcessFlow;
