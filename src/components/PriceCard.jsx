const PriceCard = ({ coin, onClick }) => {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div 
      onClick={onClick}
      className="bg-slate-900 p-6 rounded-[28px] border border-slate-800 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer active:scale-95"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <img src={coin.image} alt={coin.name} className="w-10 h-10 group-hover:rotate-12 transition-transform" />
          <div>
            <h3 className="font-bold text-white text-lg">{coin.name}</h3>
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{coin.symbol}</span>
          </div>
        </div>
        <div className={`text-[10px] font-bold px-2 py-1 rounded-lg ${isPositive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
          {isPositive ? '▲' : '▼'} {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
        </div>
      </div>

      <div className="mt-6">
        <p className="text-3xl font-bold text-white">
          ${coin.current_price.toLocaleString()}
        </p>
        <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <p className="text-[10px] text-slate-500 uppercase font-bold ">Live Market Price</p>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;