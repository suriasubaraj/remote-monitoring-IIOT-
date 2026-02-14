
import React from 'react';
import { InventoryItem } from '../types';

interface InventoryProps {
  items: InventoryItem[];
}

const InventorySnapshot: React.FC<InventoryProps> = ({ items }) => {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-white">Inventory Snapshot</h3>
        <button className="text-xs text-blue-400 font-bold hover:text-blue-300 transition-colors">Manage Stock</button>
      </div>
      
      <div className="space-y-6">
        {items.map((item) => {
          const percentage = (item.value / item.max) * 100;
          const isLow = percentage < 20;
          
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-300">{item.label}</span>
                <span className={`text-sm font-bold ${isLow ? 'text-red-400 animate-pulse' : 'text-slate-100'}`}>
                  {item.value.toLocaleString()} / {item.max.toLocaleString()} {item.unit}
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
                <div 
                  className={`h-full transition-all duration-1000 ${isLow ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]'}`} 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              {isLow && (
                <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                  Stock critical - Reorder suggested
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InventorySnapshot;
