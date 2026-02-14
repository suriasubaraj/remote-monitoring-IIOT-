
import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  ScissorsLineDashed, 
  Database, 
  Activity, 
  CheckCircle, 
  BarChart3, 
  FileText, 
  Settings 
} from 'lucide-react';
import { Page } from '../types';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, onNavigate }) => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard' as Page },
    { icon: Layers, label: 'Components & Processes' as Page },
    { icon: ScissorsLineDashed, label: 'Stitching Modes' as Page },
    { icon: Database, label: 'Materials Tracking' as Page },
    { icon: Activity, label: 'Station Monitoring' as Page },
    { icon: CheckCircle, label: 'Quality Control' as Page },
    { icon: BarChart3, label: 'Production Analytics' as Page },
    { icon: FileText, label: 'Reports' as Page },
    { icon: Settings, label: 'Settings' as Page },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen fixed left-0 top-0 border-r border-slate-800 transition-all duration-300 z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-900/40">S</div>
        <span className="text-xl font-bold text-white tracking-tight">StepSmart</span>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => onNavigate(item.label)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
              activePage === item.label 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                : 'hover:bg-slate-800 hover:text-white text-slate-400'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium text-sm text-left">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="p-6 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
          <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">Live Efficiency</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[89%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-2 font-medium">Global: 89.4%</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
