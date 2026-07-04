import React, { useState, useEffect } from "react";
import { Search, Loader2, BarChart3, ShoppingBag, Globe, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import API from "../api";
import Navbar from "../components/Navbar";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const Marketplace = () => {
  const [viewMode, setViewMode] = useState("listings"); // 'listings' or 'analytics'
  const [products, setProducts] = useState([]);
  const [liveAnalytics, setLiveAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAllData = async () => {
    try {
      setLoading(true);
      // Fetching both Farmer Listings and Market Analysis data
      const [cropsRes, liveRes] = await Promise.all([
        API.get("/crops/all").catch(() => ({ data: { data: [] } })),
        API.get("/crops/live-rates").catch(() => ({ data: { data: [] } }))
      ]);
      
      setProducts(cropsRes.data.data || []);
      setLiveAnalytics(liveRes.data.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllData(); }, []);

  // Determine which dataset to filter based on the active tab
  const currentDataset = viewMode === "listings" ? products : liveAnalytics;

  const filteredData = currentDataset.filter(item => {
    const name = (item.cropName || item.name || "").toLowerCase();
    const loc = (item.location || item.mandi || "").toLowerCase();
    return name.includes(searchTerm.toLowerCase()) || loc.includes(searchTerm.toLowerCase());
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: "rgba(255,255,255,0.02)" }, ticks: { color: "#52525b", font: { size: 9 } } },
      x: { grid: { display: false }, ticks: { color: "#52525b", font: { size: 9 } } }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white antialiased pb-20">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div>
            <h1 className="text-6xl font-black italic uppercase tracking-tighter">
              Mandi <span className="text-emerald-500">{viewMode === "listings" ? "Hub" : "Analysis"}</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2 mt-4">
              <Globe size={14} className="text-emerald-500" />
              {viewMode === "listings" ? "Browse Farmer Listings" : `Real-Time Market Analysis`}
            </p>
          </div>

          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
            <div className="flex bg-zinc-900/50 p-1.5 rounded-3xl border border-white/5">
              <button 
                onClick={() => setViewMode("listings")} 
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-black uppercase transition-all ${viewMode === "listings" ? "bg-emerald-500 text-black" : "text-zinc-500 hover:text-white"}`}
              >
                <ShoppingBag size={14} /> Listings
              </button>
              <button 
                onClick={() => setViewMode("analytics")} 
                className={`flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-black uppercase transition-all ${viewMode === "analytics" ? "bg-emerald-500 text-black" : "text-zinc-500 hover:text-white"}`}
              >
                <BarChart3 size={14} /> Analysis
              </button>
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
              <input 
                type="text" 
                placeholder={`Search ${viewMode === 'listings' ? 'crops...' : 'market trends...'}`} 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-xs focus:border-emerald-500 outline-none transition-all" 
              />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <div className="py-40 flex flex-col items-center">
              <Loader2 className="animate-spin text-emerald-500" size={48} />
              <p className="text-zinc-500 text-[10px] font-bold uppercase mt-4 tracking-widest">Syncing Data...</p>
            </div>
          ) : (
            <motion.div 
              key={viewMode}
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }} 
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {filteredData.length > 0 ? filteredData.map((item, idx) => (
                <div key={idx} className="bg-zinc-900/40 border border-white/5 rounded-[3.5rem] p-8 group hover:border-emerald-500/30 transition-all duration-500">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-6">
                      {/* Show image only for listings mode */}
                      {viewMode === "listings" && item.image && (
                        <img src={`http://localhost:5000/${item.image}`} className="w-24 h-24 object-cover rounded-3xl border border-white/10" alt="crop" />
                      )}
                      {/* Icon placeholder for analysis mode */}
                      {viewMode === "analytics" && (
                        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 text-2xl font-black italic">
                          {(item.name || "C")[0]}
                        </div>
                      )}
                      <div>
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-zinc-100">{item.cropName || item.name}</h2>
                        <p className="text-zinc-500 text-[10px] font-bold uppercase flex items-center gap-1 mt-1 tracking-wider">
                          <MapPin size={12} className="text-emerald-500" /> {item.location || item.mandi}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-4xl font-black tracking-tighter text-emerald-500">₹{item.price}</p>
                      {item.change && (
                        <div className={`flex items-center justify-end gap-1 text-[10px] font-black mt-1 ${item.change.includes('+') ? 'text-green-500' : 'text-red-500'}`}>
                          {item.change.includes('+') ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}
                          {item.change}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Graph specifically for Market Analysis Mode */}
                  {viewMode === "analytics" && (
                    <div className="h-48 w-full mt-8 bg-black/40 rounded-[2.5rem] p-6 border border-white/5 shadow-inner">
                      <Line
                        data={{
                          labels: item.labels || ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                          datasets: [{
                            label: 'Price History',
                            data: item.priceHistory || [item.price-100, item.price-50, item.price-20, item.price],
                            borderColor: '#10b981',
                            borderWidth: 3,
                            fill: true,
                            backgroundColor: 'rgba(16, 185, 129, 0.05)',
                            tension: 0.4,
                            pointRadius: 0,
                          }]
                        }}
                        options={chartOptions}
                      />
                    </div>
                  )}
                </div>
              )) : (
                <div className="col-span-full text-center py-20 text-zinc-600 uppercase font-black tracking-widest text-xs">
                  No data found for this category
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Marketplace;