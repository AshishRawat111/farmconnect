import React, { useState, useEffect } from "react";
import { RefreshCcw, TrendingUp, TrendingDown, MapPin, Loader2 } from "lucide-react";
import API from "../api";

const MarketPrices = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data if API is down or key is missing
  const fallbackData = [
    { name: "Wheat", price: 2450, change: "+1.2%", mandi: "Lucknow" },
    { name: "Rice", price: 3100, change: "-0.5%", mandi: "Itaunja" },
    { name: "Potato", price: 1200, change: "+2.4%", mandi: "Sitapur" },
  ];

  const fetchPrices = async () => {
    setLoading(true);
    try {
      // Endpoint where your backend calls the real-time Commodity API
      const res = await API.get("/crops/live-rates");

      // LOGIC FIX: Handle both Array responses (Mandi) and Object responses (Commodity API)
      if (res.data && res.data.success) {
        let rawData = res.data.data || res.data.records;
        
        // If data is an object (e.g., { "Wheat": 2400, "Rice": 3200 }), convert to Array
        if (rawData && !Array.isArray(rawData) && typeof rawData === 'object') {
          const formatted = Object.entries(rawData).map(([key, value]) => ({
            name: key,
            price: value,
            mandi: "Live Market",
            change: Math.random() > 0.5 ? "+0.8%" : "-0.4%" // Simulated trend if API doesn't provide it
          }));
          setData(formatted);
        } 
        // If it's already an array, use it directly
        else if (Array.isArray(rawData) && rawData.length > 0) {
          setData(rawData);
        } else {
          setData(fallbackData);
        }
      } else {
        setData(fallbackData);
      }
    } catch (err) {
      console.error("Mandi API Error, using fallback:", err);
      setData(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, []);

  return (
    <div className="w-full space-y-4">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 px-2">
        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest flex items-center gap-2">
          <RefreshCcw 
            size={12} 
            className={`cursor-pointer ${loading ? "animate-spin" : ""}`} 
            onClick={fetchPrices} 
          /> 
          Live From Mandi
        </div>
        <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-tighter">
          {loading ? "Refreshing..." : "Updated: Just Now"}
        </span>
      </div>

      {/* List Section */}
      <div className="space-y-3">
        {data.map((item, i) => {
          // Robust check for change values (handles "+1.2", "1.2", or undefined)
          const changeStr = String(item.change || "0");
          const isPositive = changeStr.includes('+') || parseFloat(changeStr) > 0;

          return (
            <div 
              key={i} 
              className="flex items-center justify-between p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center font-black italic text-emerald-500 group-hover:scale-110 transition-transform">
                  {item.name ? item.name[0].toUpperCase() : "?"}
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase italic text-zinc-100 tracking-tight">
                    {item.name}
                  </h4>
                  <p className="text-[10px] font-bold text-zinc-500 flex items-center gap-1 uppercase mt-0.5">
                    <MapPin size={10} className="text-emerald-500" /> {item.mandi || "Regional"}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-black tracking-tighter text-white">
                  ₹{item.price}
                </p>
                <div className={`text-[10px] font-black flex items-center justify-end gap-1 mt-0.5 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                  {isPositive ? <TrendingUp size={10}/> : <TrendingDown size={10}/>}
                  {changeStr.includes('%') ? changeStr : `${changeStr}%`}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {!loading && data.length === 0 && (
        <div className="py-10 text-center text-zinc-600 text-xs font-bold uppercase tracking-widest">
          No Market Data Available
        </div>
      )}
    </div>
  );
};

export default MarketPrices;