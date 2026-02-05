import { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import PriceCard from './components/PriceCard';
import MarketTable from './components/MarketTable';
import SearchBar from './components/SearchBar';
import CoinChart from './components/CoinChart';
import { useCrypto } from './hooks/useCryptoData';
import { SignedIn, SignedOut, SignInButton,useUser } from "@clerk/clerk-react"; 
import { Star, TrendingUp, TrendingDown, Zap, Shield, Rocket, BarChart3, AlertCircle, RefreshCw } from 'lucide-react'; 

function App() {
  
  const { data, isLoading, error } = useCrypto(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [displayLimit, setDisplayLimit] = useState(5);
  const [selectedCoin, setSelectedCoin] = useState({ id: 'bitcoin', name: 'Bitcoin' });
  
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('cryptoWatchlist');
    return saved ? JSON.parse(saved) : [];
  });
  const [showWatchlistOnly, setShowWatchlistOnly] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    localStorage.setItem('cryptoWatchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (id) => {
    setWatchlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const insights = useMemo(() => {
    if (!data || data.length === 0) return null;
    const sorted = [...data].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    return {
      topGainer: sorted[0],
      topLoser: sorted[sorted.length - 1],
      marketLeader: data.find(c => c.id === 'bitcoin') || data[0]
    };
  }, [data]);

  const filteredData = data?.filter((coin) => {
    const matchesSearch = coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesWatchlist = showWatchlistOnly ? watchlist.includes(coin.id) : true;
    return matchesSearch && matchesWatchlist;
  }) || []; 

  const handleLoadMore = () => setDisplayLimit((prev) => prev + 10);

  const handleCoinSelect = (id, name) => {
    setSelectedCoin({ id, name });
    setSearchQuery("");
    window.scrollTo({ top: 350, behavior: 'smooth' }); 
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20 selection:bg-indigo-500/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <SignedIn>
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <h2 className="text-4xl font-bold text-white uppercase italic leading-none ">
                Market <span className="text-indigo-600 not-italic">Core</span>
              </h2>
              <p className="text-slate-500 text-sm font-medium mt-2">
                Welcome back, {user?.firstName || "Trader"}! Monitoring {data?.length || 0} assets.
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
               <button 
                onClick={() => setShowWatchlistOnly(!showWatchlistOnly)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl border transition-all cursor-pointer font-bold text-xs md:text-nowrap uppercase tracking-widest ${
                  showWatchlistOnly 
                  ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
               >
                 <Star size={16} fill={showWatchlistOnly ? "currentColor" : "none"} />
                 {showWatchlistOnly ? "Watchlist Active" : "View Favorites"}
               </button>
            </div>
          </div>

          {/* API Error / Limit UI */}
          {!isLoading && error && (
            <div className="mb-12 p-8 border border-red-500/20 bg-red-500/5 rounded-4xl text-center">
              <AlertCircle className="mx-auto text-red-500 mb-4" size={40} />
              <h3 className="text-xl font-bold uppercase ">Market Data Unavailable</h3>
              <p className="text-slate-400 text-sm mt-2 max-w-md mx-auto">
                CoinGecko limit reached (Error 429). Please wait a minute or two and refresh the terminal.
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 flex items-center gap-2 mx-auto px-6 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all cursor-pointer"
              >
                <RefreshCw size={14} /> Reconnect
              </button>
            </div>
          )}

          {/* Market Insights Section */}
          {!isLoading && !error && !showWatchlistOnly && insights && (
            <div className="mb-16 animate-in fade-in duration-700">
              <div className="flex items-center gap-3 mb-6">
                <Zap className="text-indigo-500" size={20} />
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Market Briefing</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">
                    <TrendingUp size={15} className="text-green-500" /> Top Gainer
                  </span>
                  <PriceCard coin={insights.topGainer} onClick={() => handleCoinSelect(insights.topGainer.id, insights.topGainer.name)} />
                </div>
                <div className="space-y-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">
                    <TrendingDown size={15} className="text-red-500" /> Top Loser
                  </span>
                  <PriceCard coin={insights.topLoser} onClick={() => handleCoinSelect(insights.topLoser.id, insights.topLoser.name)} />
                </div>
                <div className="space-y-3">
                  <span className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest ml-2">
                    <Zap size={15} className="text-indigo-500" /> Market Cap King
                  </span>
                  <PriceCard coin={insights.marketLeader} onClick={() => handleCoinSelect(insights.marketLeader.id, insights.marketLeader.name)} />
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
               <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
               <p className="text-slate-500 font-bold animate-pulse text-xs tracking-widest uppercase">Fetching Data...</p>
            </div>
          )}

          {!isLoading && !error && filteredData.length === 0 ? (
            <div className="text-center py-24 bg-slate-900/30 rounded-[40px] border-2 border-dashed border-slate-800">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white uppercase">No assets found</h3>
              <button 
                onClick={() => {setSearchQuery(""); setShowWatchlistOnly(false);}}
                className="mt-6 text-indigo-500 font-bold underline decoration-2 underline-offset-4 cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : !isLoading && !error && (
            <>
              {!searchQuery && (
                <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                  <CoinChart coinId={selectedCoin.id} coinName={selectedCoin.name} />
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-white italic uppercase">
                    {showWatchlistOnly ? "Watchlist Analysis" : "Market Statistics"}
                  </h2>
                  <div className="h-px bg-slate-800 flex-1 mt-1"></div>
                </div>
                
                <MarketTable 
                  onCoinClick={handleCoinSelect} 
                  data={filteredData.slice(0, displayLimit)}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />

                {filteredData.length > displayLimit && !showWatchlistOnly && (
                  <div className="flex justify-center mt-6">
                    <button 
                      onClick={handleLoadMore}
                      className="group relative px-12 py-4 bg-slate-900 border border-slate-800 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] text-indigo-500 hover:border-indigo-500 transition-all active:scale-95 cursor-pointer shadow-2xl"
                    >
                      <span className="relative z-10">Load More Assets</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </SignedIn>

        {/* SignedOut section waise hi hai */}
        <SignedOut>
          <div className="relative mt-16 text-center py-24 px-6 overflow-hidden bg-slate-900/20 border border-slate-800/50 rounded-[40px] md:rounded-[64px] backdrop-blur-3xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-600/5 blur-[100px] rounded-full -z-10"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-8">
                <Shield size={14} className="text-indigo-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Institutional Grade Terminal</span>
              </div>
              
              <h2 className="text-5xl md:text-6xl font-black mb-8 uppercase italic leading-none text-white">
                Empower Your <br /> 
                <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-indigo-400">
                  Crypto
                </span> Journey
              </h2>
              
              <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
                Professional analytics, real-time tracking, and market intelligence—all in one place. Mahnoor's terminal is optimized for speed and precision.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <SignInButton mode="modal">
                  <button className="group relative px-10 py-5 bg-indigo-600 rounded-2xl font-black text-sm uppercase tracking-widest text-white hover:bg-indigo-500 transition-all active:scale-95 cursor-pointer shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
                    Access Terminal
                    <Rocket className="inline-block ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                  </button>
                </SignInButton>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-24 border-t border-slate-800/50 pt-16">
                <div className="flex flex-col items-center gap-3">
                  <BarChart3 className="text-slate-500" size={24} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Charts</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Star className="text-slate-500" size={24} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Custom Watchlist</span>
                </div>
                <div className="flex flex-col items-center gap-3 col-span-2 md:col-span-1">
                  <Zap className="text-slate-500" size={24} />
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Fast Sync</span>
                </div>
              </div>
            </div>
          </div>
        </SignedOut>
      </main>
    </div>
  );
}

export default App;