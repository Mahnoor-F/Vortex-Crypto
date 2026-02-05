import { Star } from 'lucide-react';

const MarketTable = ({ data, onCoinClick, watchlist, toggleWatchlist }) => {
  return (
    <div className="mt-8 overflow-x-auto bg-slate-900/50 rounded-3xl border border-slate-800 backdrop-blur-sm">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
            <th className="px-6 py-6 w-10"></th>
            <th className="px-6 py-6">#</th>
            <th className="px-6 py-6">Asset</th>
            <th className="px-6 py-6">Price</th>
            <th className="px-6 py-6">24h Change</th>
            <th className="px-6 py-6 hidden md:table-cell">Market Cap</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/50">
          {data?.map((coin, index) => {
            const isPositive = coin.price_change_percentage_24h > 0;
            const isFavorite = watchlist.includes(coin.id);

            return (
              <tr 
                key={coin.id} 
                className="hover:bg-blue-600/5 cursor-pointer transition-all active:bg-blue-600/10 group"
              >
                <td className="px-6 py-5">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWatchlist(coin.id);
                    }}
                    className={`transition-colors cursor-pointer ${isFavorite ? 'text-yellow-400' : 'text-slate-600 hover:text-slate-400'}`}
                  >
                    <Star size={16} fill={isFavorite ? "currentColor" : "none"} />
                  </button>
                </td>
                <td onClick={() => onCoinClick(coin.id, coin.name)} className="px-6 py-5 text-slate-600 font-mono text-xs">
                  {index + 1}
                </td>
                <td onClick={() => onCoinClick(coin.id, coin.name)} className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <img src={coin.image} alt={coin.name} className="w-7 h-7" />
                    <div className="flex flex-col">
                      <span className="font-bold text-white group-hover:text-blue-400 transition-colors">{coin.name}</span>
                      <span className="text-[10px] text-slate-500 uppercase mt-1 font-semibold">{coin.symbol}</span>
                    </div>
                  </div>
                </td>
                <td onClick={() => onCoinClick(coin.id, coin.name)} className="px-6 py-5 font-bold text-white text-sm">
                  ${coin.current_price?.toLocaleString() || "0.00"}
                </td>
                <td onClick={() => onCoinClick(coin.id, coin.name)} className={`px-6 py-5 text-sm font-bold ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                  {coin.price_change_percentage_24h 
                    ? `${isPositive ? '+' : ''}${coin.price_change_percentage_24h.toFixed(2)}%` 
                    : "0.00%"}
                </td>
                <td onClick={() => onCoinClick(coin.id, coin.name)} className="px-6 py-5 text-slate-400 text-xs hidden md:table-cell font-medium">
                  ${coin.market_cap ? (coin.market_cap / 1e9).toFixed(2) : "0.00"}B
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;