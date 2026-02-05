import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useChartData } from '../hooks/useChartData';

const CoinChart = ({ coinId, coinName }) => {
  const { data: chartData, isLoading } = useChartData(coinId);

  if (isLoading) return (
    <div className="h-112.5 flex items-center justify-center bg-slate-900/50 rounded-4xl border border-slate-800">
      <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="bg-slate-900/50 p-6 md:p-8 rounded-4xl border border-slate-800 h-112.5 relative overflow-hidden cursor-crosshair">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[100px] -z-10"></div>
      
      <div className="flex justify-between items-start mb-10">
        <div>
          <h3 className="text-3xl font-bold text-white uppercase italic">
            {coinName} <span className="text-blue-600 not-italic">Analytics</span>
          </h3>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase mt-1">
            7-Day Market Performance
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 text-nowrap rounded-xl md:rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Live Data</span>
        </div>
      </div>


      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} opacity={0.5} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{fill: '#94a3b8', fontSize: 11, fontWeight: '600'}} 
              dy={15}
              interval={0} 
            />
            <YAxis 
              orientation="right"
              tick={{fill: '#64748b', fontSize: 10}}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              domain={['auto', 'auto']}
              dx={10}
            />
            <Tooltip 
              formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #1e293b', 
                borderRadius: '16px', 
                fontWeight: 'bold',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
              }}
              cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#2563eb" 
              strokeWidth={4} 
              fillOpacity={1} 
              fill="url(#colorPrice)" 
              animationDuration={2000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CoinChart;