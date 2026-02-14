
import React, { useState, useEffect, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPISection from './components/KPISection';
import StationMonitoring from './components/StationMonitoring';
import ProcessFlow from './components/ProcessFlow';
import QualityControl from './components/QualityControl';
import InventorySnapshot from './components/InventorySnapshot';
import AlertsPanel from './components/AlertsPanel';
import { 
  generateStationData, 
  generateKPIs, 
  generateInventory, 
  generateAlerts,
  generateQCData,
  generateDefectDist,
  generateProcesses,
  generateStitchModes,
  generateMaterials,
  /* Added processNames to imports */
  processNames
} from './services/dataGenerator';
import { 
  StationData, 
  KPIMetrics, 
  /* InventoryItem is now available in types.ts */
  InventoryItem, 
  Alert, 
  QCData, 
  DefectDistribution, 
  Page, 
  Process, 
  StitchMode, 
  Material,
  StationStatus 
} from './types';
import { 
  Download, 
  FileText, 
  Database, 
  Info, 
  ShieldCheck, 
  Factory, 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowUpRight,
  Zap,
  Clock,
  Settings as SettingsIcon,
  User,
  Bell,
  Cpu,
  BarChart as BarIcon,
  Flame,
  MousePointer2
} from 'lucide-react';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('Dashboard');
  const [stations, setStations] = useState<StationData[]>(generateStationData());
  const [kpis, setKpis] = useState<KPIMetrics>(generateKPIs());
  const [inventory, setInventory] = useState<InventoryItem[]>(generateInventory());
  const [alerts, setAlerts] = useState<Alert[]>(generateAlerts());
  const [qcData, setQcData] = useState<QCData[]>(generateQCData());
  const [defectDist, setDefectDist] = useState<DefectDistribution[]>(generateDefectDist());
  const [processes, setProcesses] = useState<Process[]>(generateProcesses());
  const [stitchModes, setStitchModes] = useState<StitchMode[]>(generateStitchModes());
  const [materials, setMaterials] = useState<Material[]>(generateMaterials());

  // Search and Filter State for Components & Processes
  const [procSearch, setProcSearch] = useState('');
  const [procCategory, setProcCategory] = useState('All');

  const filteredProcesses = useMemo(() => {
    return processes.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(procSearch.toLowerCase()) || p.machineId.toLowerCase().includes(procSearch.toLowerCase());
      const matchCategory = procCategory === 'All' || p.category === procCategory;
      return matchSearch && matchCategory;
    });
  }, [processes, procSearch, procCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setKpis(prev => ({
        ...prev,
        totalPairs: prev.totalPairs + Math.floor(Math.random() * 2),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <section>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Executive Dashboard</h2>
                <p className="text-slate-500">Real-time holistic view of factory throughput and efficiency.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Pairs Today', value: kpis.totalPairs, icon: Factory, color: 'blue' },
                  { label: 'Active Processes', value: kpis.activeProcesses, icon: Cpu, color: 'purple' },
                  { label: 'Defect Rate', value: `${kpis.defectRate}%`, icon: ShieldCheck, color: 'amber' },
                  { label: 'Utilization', value: `${kpis.utilization}%`, icon: Zap, color: 'emerald' },
                  { label: 'Consumption', value: kpis.materialConsumption, icon: Database, color: 'indigo' },
                  { label: 'On-Time', value: `${kpis.onTimeProduction}%`, icon: Clock, color: 'blue' },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                    <div className={`p-2 rounded-lg bg-slate-800 text-${item.color}-500 mb-2`}>
                      <item.icon size={18} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-bold text-white mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </section>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 space-y-8">
                 <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                   <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-bold text-slate-300 flex items-center gap-2">
                       <BarIcon size={18} className="text-blue-500" /> Key Process Heatmap
                     </h3>
                     <button onClick={() => setActivePage('Components & Processes')} className="text-xs text-blue-400 font-bold hover:underline">View All 65 Processes</button>
                   </div>
                   <div className="grid grid-cols-5 gap-2">
                     {processes.slice(0, 15).map((p, idx) => (
                       <div key={p.id} className={`h-16 rounded-lg flex flex-col items-center justify-center p-2 border ${p.qualityScore > 98 ? 'bg-blue-600/10 border-blue-600/30' : 'bg-slate-800 border-slate-700'}`}>
                         <span className="text-[8px] font-bold text-slate-500 truncate w-full text-center">{p.name}</span>
                         <span className="text-sm font-bold text-white">{p.qualityScore.toFixed(1)}%</span>
                       </div>
                     ))}
                   </div>
                 </section>
                 <ProcessFlow />
              </div>
              <div className="xl:col-span-1">
                <AlertsPanel alerts={alerts} />
              </div>
            </div>
          </div>
        );

      case 'Components & Processes':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Components & Processes</h2>
                <p className="text-slate-500">Deep-dive monitoring for all {processes.length} manufacturing stages.</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search processes..." 
                    className="pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm text-slate-300 w-64 focus:ring-2 focus:ring-blue-500/50 outline-none"
                    value={procSearch}
                    onChange={(e) => setProcSearch(e.target.value)}
                  />
                </div>
                <select 
                  className="bg-slate-900 border border-slate-800 text-slate-300 text-sm px-4 py-2 rounded-lg outline-none"
                  value={procCategory}
                  onChange={(e) => setProcCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Pre-Production">Pre-Production</option>
                  <option value="Stitching">Stitching</option>
                  <option value="Lasting">Lasting</option>
                  <option value="Bottoming">Bottoming</option>
                  <option value="Finishing">Finishing</option>
                  <option value="Packaging">Packaging</option>
                </select>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-950/50 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800">
                    <th className="py-4 px-6">Process Name</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">TP (p/h)</th>
                    <th className="py-4 px-6">Machine ID</th>
                    <th className="py-4 px-6">Energy</th>
                    <th className="py-4 px-6">Quality</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredProcesses.map((p) => (
                    <tr key={p.id} className="text-sm hover:bg-slate-800/30 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{p.name}</span>
                          <span className="text-[10px] text-slate-500 uppercase font-medium">{p.category}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${p.status === StationStatus.RUNNING ? 'bg-blue-500 animate-pulse' : p.status === StationStatus.IDLE ? 'bg-slate-600' : 'bg-red-500'}`}></div>
                          <span className={`text-xs font-bold uppercase tracking-tighter ${p.status === StationStatus.RUNNING ? 'text-blue-400' : 'text-slate-500'}`}>{p.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-white">{p.throughput}</td>
                      <td className="py-4 px-6 text-slate-400 font-mono text-xs">{p.machineId}</td>
                      <td className="py-4 px-6 text-slate-400">{p.energyConsumption.toFixed(1)} kWh</td>
                      <td className="py-4 px-6">
                         <div className="flex items-center gap-2">
                           <div className="flex-1 h-1 bg-slate-800 rounded-full w-12 overflow-hidden">
                             <div className={`h-full ${p.qualityScore > 98 ? 'bg-blue-500' : 'bg-amber-500'}`} style={{ width: `${p.qualityScore}%` }}></div>
                           </div>
                           <span className="font-bold text-white text-xs">{p.qualityScore.toFixed(1)}%</span>
                         </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-blue-400 font-bold text-xs uppercase hover:underline">Monitor</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredProcesses.length === 0 && (
                <div className="p-12 text-center text-slate-500 italic">No processes found matching your filter criteria.</div>
              )}
            </div>
          </div>
        );

      case 'Stitching Modes':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Stitching Modes Analysis</h2>
              <p className="text-slate-500">Statistical breakdown and quality metrics for used sewing methods.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                 <h3 className="font-bold text-white mb-6">Usage Frequency</h3>
                 <div className="space-y-6">
                   {stitchModes.map(sm => (
                     <div key={sm.id} className="space-y-2">
                       <div className="flex justify-between items-center text-sm">
                         <span className="font-bold text-slate-200">{sm.name}</span>
                         <span className="text-slate-500">{sm.usageFrequency}% of total production</span>
                       </div>
                       <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500" style={{ width: `${sm.usageFrequency}%` }}></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                 <h3 className="font-bold text-white mb-6">Defect Rate by Mode</h3>
                 <div className="space-y-4">
                   {stitchModes.map(sm => (
                     <div key={sm.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-slate-700/30">
                       <div>
                         <p className="text-sm font-bold text-white">{sm.name}</p>
                         <p className="text-xs text-slate-500 mt-1">{sm.description}</p>
                       </div>
                       <div className="text-right">
                         <p className={`text-lg font-bold ${sm.defectRate > 1.5 ? 'text-red-400' : 'text-blue-400'}`}>{sm.defectRate}%</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Defect Rate</p>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        );

      case 'Materials Tracking':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Materials Tracking</h2>
              <p className="text-slate-500">Real-time inventory levels and resource waste analysis across production hall.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <InventorySnapshot items={materials.map(m => ({ id: m.id, label: m.name, value: m.stockLevel, max: m.maxStock, unit: m.unit }))} />
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm">
                 <h3 className="font-bold text-white mb-6">Resource Waste Analysis</h3>
                 <div className="space-y-4">
                   {materials.map(m => (
                     <div key={m.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/20">
                       <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${m.wastePercentage > 10 ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-400'}`}>
                           <Database size={16} />
                         </div>
                         <span className="text-sm font-bold text-slate-200">{m.name}</span>
                       </div>
                       <div className="flex items-center gap-8">
                         <div className="text-right">
                           <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Avg Waste</p>
                           <p className={`text-sm font-bold ${m.wastePercentage > 10 ? 'text-amber-500' : 'text-blue-400'}`}>{m.wastePercentage}%</p>
                         </div>
                         <div className="text-right">
                           <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Usage/Unit</p>
                           <p className="text-sm font-bold text-white">{m.usagePerProcess} {m.unit}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
                 <div className="mt-8 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                    <p className="text-xs text-blue-300 leading-relaxed font-medium">
                      <span className="font-bold uppercase tracking-widest block mb-1">AI Optimization Tip:</span>
                      Increasing "Synthetic Mesh" nesting efficiency in Pre-Production could reduce waste by up to 4.5% based on current pattern analysis.
                    </p>
                 </div>
              </div>
            </div>
          </div>
        );

      case 'Station Monitoring':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">Station Monitoring</h2>
                <p className="text-slate-500">Deep telemetry and health monitoring for localized production clusters.</p>
              </div>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/40 border border-blue-400/20">
                Sync All Stations
              </button>
            </div>
            <StationMonitoring stations={stations} />
          </div>
        );

      case 'Quality Control':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Quality Control Hub</h2>
              <p className="text-slate-500">Defect tracking across components, stitch modes, and machine lines.</p>
            </div>
            <QualityControl lineData={qcData} barData={defectDist} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                 <h3 className="font-bold text-white mb-6">Top Defective Components</h3>
                 <div className="space-y-4">
                   {processes.sort((a,b) => a.qualityScore - b.qualityScore).slice(0, 5).map(p => (
                     <div key={p.id} className="flex items-center justify-between py-2 border-b border-slate-800 last:border-none">
                       <span className="text-sm text-slate-300 font-medium">{p.name}</span>
                       <div className="flex items-center gap-4">
                         <span className="text-xs text-slate-500 font-bold uppercase">{p.category}</span>
                         <span className="text-sm font-bold text-red-400">{(100 - p.qualityScore).toFixed(1)}% Error</span>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                 <h3 className="font-bold text-white mb-6">Recent Rejected Batches</h3>
                 <div className="space-y-3">
                   {[1,2,3].map(i => (
                     <div key={i} className="p-3 bg-red-500/5 border border-red-500/20 rounded-xl flex items-center justify-between">
                       <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500">
                           <ShieldCheck size={18} />
                         </div>
                         <div>
                           <p className="text-xs font-bold text-white">BATCH #992{i}-REJ</p>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Reason: Sole Misalignment</p>
                         </div>
                       </div>
                       <button className="text-[10px] font-bold text-blue-400 hover:underline">RE-INSPECT</button>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        );

      case 'Production Analytics':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Production Analytics</h2>
              <p className="text-slate-500">Advanced bottleneck detection and cross-department efficiency modeling.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Flame size={12} className="text-amber-500" /> Critical Bottleneck</p>
                 <p className="text-lg font-bold text-white mb-1">Stitching - Vamp</p>
                 <p className="text-xs text-slate-400">Delay impact: +12 mins/cycle</p>
               </div>
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><MousePointer2 size={12} className="text-blue-500" /> Best Performer</p>
                 <p className="text-lg font-bold text-white mb-1">Packaging - Box Assembly</p>
                 <p className="text-xs text-slate-400">Efficiency: 104.2%</p>
               </div>
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Clock size={12} className="text-indigo-500" /> Avg Cycle Time</p>
                 <p className="text-lg font-bold text-white mb-1">32.4 Seconds</p>
                 <p className="text-xs text-slate-400">Total plant average</p>
               </div>
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1.5"><Zap size={12} className="text-emerald-500" /> Predicted Yield</p>
                 <p className="text-lg font-bold text-white mb-1">14,882 Pairs</p>
                 <p className="text-xs text-slate-400">By end of current shift</p>
               </div>
            </div>
            
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
               <h3 className="font-bold text-white mb-6">Category Efficiency Breakdown</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
                 {/* processNames is now imported from services/dataGenerator */}
                 {Object.keys(processNames).map(cat => {
                   const catProcs = processes.filter(p => p.category === cat);
                   const avgQual = catProcs.reduce((acc, curr) => acc + curr.qualityScore, 0) / catProcs.length;
                   return (
                     <div key={cat} className="space-y-3 p-4 bg-slate-950/40 rounded-xl border border-slate-800/50">
                       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{cat}</p>
                       <div className="flex items-baseline gap-1">
                         <span className="text-2xl font-bold text-white">{avgQual.toFixed(1)}</span>
                         <span className="text-[10px] font-bold text-slate-500">%</span>
                       </div>
                       <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500" style={{ width: `${avgQual}%` }}></div>
                       </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          </div>
        );

      case 'Reports':
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Production Reports Vault</h2>
              <p className="text-slate-500">Historical performance logs and automated shift summaries.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Full Plant Audit (65 Stages)', date: 'Today, 06:00 AM', type: 'PDF' },
                { title: 'Stitching Analysis Q4', date: 'Oct 26, 2023', type: 'CSV' },
                { title: 'Material Waste Breakdown', date: 'Oct 25, 2023', type: 'PDF' },
                { title: 'Energy Utilization Log', date: 'Oct 24, 2023', type: 'XLSX' },
                { title: 'Shift Supervisor Summary', date: 'Oct 23, 2023', type: 'PDF' },
                { title: 'Maintenance Forecast Q1', date: 'Oct 22, 2023', type: 'PDF' }
              ].map((report, i) => (
                <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-slate-600 transition-all group">
                  <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 mb-4 border border-slate-700/50 group-hover:text-blue-400 transition-colors">
                    <FileText size={24} />
                  </div>
                  <h3 className="font-bold text-white mb-1">{report.title}</h3>
                  <p className="text-[10px] text-slate-500 mb-6 font-bold uppercase tracking-widest">{report.date} • {report.type}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-700 border border-slate-700/50">Download</button>
                    <button className="flex-1 py-2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-blue-500 shadow-lg shadow-blue-900/20">Archive</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'Settings':
        return (
          <div className="max-w-4xl space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">System Settings</h2>
              <p className="text-slate-500">Configure factory parameters, notifications, and AI sensitivities.</p>
            </div>
            <div className="space-y-6">
              <section className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white mb-8 flex items-center gap-3 text-lg">
                  <Bell size={20} className="text-blue-500" /> Notification Logic
                </h3>
                <div className="space-y-6">
                  {[
                    { label: 'Process Downtime Alerts', desc: 'Trigger for any of the 65 processes when idle > 5 mins.' },
                    { label: 'Material Threshold Warnings', desc: 'Alert when stock levels fall below 15%.' },
                    { label: 'Quality Deviation Guard', desc: 'Alert when any process drops below 94% quality score.' }
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between py-4 border-b border-slate-800 last:border-none">
                      <div className="max-w-[80%]">
                        <p className="text-sm font-bold text-slate-100 mb-0.5">{pref.label}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{pref.desc}</p>
                      </div>
                      <button className={`w-12 h-6 rounded-full relative transition-colors ${i < 2 ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-700'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${i < 2 ? 'right-1' : 'left-1'}`}></div>
                      </button>
                    </div>
                  ))}
                </div>
              </section>
              <section className="bg-slate-900 p-8 rounded-2xl border border-slate-800">
                <h3 className="font-bold text-white mb-8 flex items-center gap-3 text-lg">
                  <User size={20} className="text-blue-500" /> Plant Access
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Supervisor Name</label>
                    <input type="text" defaultValue="Sarah Jenkins" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest">Shift Area</label>
                    <input type="text" defaultValue="Production Line A-Z" className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-sm text-slate-100 focus:ring-2 focus:ring-blue-500/50 outline-none" />
                  </div>
                </div>
              </section>
              <div className="flex justify-end gap-4 mt-10">
                 <button className="px-8 py-3 bg-slate-800 text-slate-400 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-slate-700 border border-slate-700/50">Discard</button>
                 <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-900/20">Commit Changes</button>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      
      <main className="flex-1 ml-64 flex flex-col min-w-0 h-screen relative">
        <Header />
        
        {/* Subtle background glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full -z-0 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -z-0 pointer-events-none"></div>

        <div className="flex-1 p-8 pb-16 overflow-y-auto relative z-10 custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
