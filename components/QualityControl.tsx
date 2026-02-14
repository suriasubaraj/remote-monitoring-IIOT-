
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { QCData, DefectDistribution } from '../types';

interface QCProps {
  lineData: QCData[];
  barData: DefectDistribution[];
}

const COLORS = ['#3b82f6', '#f59e0b', '#ef4444'];

const QualityControl: React.FC<QCProps> = ({ lineData, barData }) => {
  const pieData = [
    { name: 'Pass', value: 98.8 },
    { name: 'Fail', value: 1.2 }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">Defects Over Time</h3>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Last 12h</span>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                itemStyle={{ color: '#fff' }}
              />
              <Line 
                type="monotone" 
                dataKey="defects" 
                stroke="#3b82f6" 
                strokeWidth={3} 
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0f172a' }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">Defects by Type</h3>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Distribution</span>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ left: -10 }}>
              <XAxis type="number" hide />
              <YAxis 
                type="category" 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 600}} 
                width={100}
              />
              <Tooltip cursor={{fill: '#1e293b', opacity: 0.4}} contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-white">Quality Ratio</h3>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pass vs Fail</span>
        </div>
        <div className="h-[250px] w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                <Cell fill="#3b82f6" />
                <Cell fill="#ef4444" opacity={0.8} />
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute flex flex-col items-center">
            <span className="text-2xl font-bold text-white">98.8%</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pass Rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualityControl;
