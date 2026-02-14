
import React, { useState, useEffect } from 'react';
import { Bell, Search, Calendar, Clock } from 'lucide-react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-20 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10 shadow-lg">
      <div className="flex items-center gap-8">
        <div>
          <h1 className="text-xl font-bold text-white">North Factory - Line A</h1>
          <div className="flex items-center gap-4 text-slate-400 text-sm mt-0.5">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-blue-400" />
              {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-blue-400" />
              {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search assets, stations..." 
            className="pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm w-80 text-slate-200 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 bg-slate-800 text-slate-400 rounded-xl hover:bg-slate-700 hover:text-white transition-colors border border-slate-700">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-slate-800"></span>
        </button>
        
        <div className="h-10 w-px bg-slate-800"></div>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-white leading-tight">Sarah Jenkins</p>
            <p className="text-xs text-slate-500 leading-tight">Shift Supervisor</p>
          </div>
          <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center font-bold border border-blue-500/30">
            SJ
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
