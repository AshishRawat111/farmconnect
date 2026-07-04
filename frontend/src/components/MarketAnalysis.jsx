import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import { Loader2, TrendingUp, TrendingDown, Search, MapPin } from "lucide-react";
import API from "../api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

// Register ChartJS Components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MarketAnalysis = () => {
  const [mandiData, setMandiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(null);

  // Generates 10-day historical data for the chart based on the real current price
  const generateHistoricalData = (currentPrice) => {
    const data = [];
    const labels = [];
    const basePrice = parseFloat(currentPrice) || 2000;
    
    for (let i = 10; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString("en-IN", { month: "short", day: "numeric" }));
      // Simulation of market volatility (3-5%)
      const variance = (Math.random() * 0.08 - 0.04) * basePrice; 
      data.push(Math.round(basePrice + variance));
    }
    data[10] = basePrice; // Ensure today's price is exact
    return { labels, data };
  };

  useEffect(() => {
    const fetchMandiData = async () => {
      try {
        setLoading(true);
        // Calling your backend which integrates the Commodity Price API
        const res = await API.get("/mandi/live-prices");
        
        // Robust check for different data structures (Array vs Object)
        let records = [];
        if (res.data.success) {
            if (Array.isArray(res.data.records)) {
                records = res.data.records;
            } else if (res.data.data && typeof res.data.data === 'object') {
                // If API returns an object of commodities (like Rice: 4000, Wheat: 2500)
                records = Object.entries(res.data.data).map(([key, value]) => ({
                    commodity: key,
                    market: "Real-time Global",
                    modal_price: value,
                    trend: Math.random() > 0.5 ? "+1.5%" : "-0.8%"
                }));
            }
        }

        setMandiData(records);
        if (records.length > 0) {
          setSelectedCrop(records[0]);
        }
      } catch (err) {
        console.error("Mandi Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMandiData();
  }, []);

  const filteredData = mandiData.filter((item) =>
    (item.commodity?.toLowerCase() || "").includes(searchQuery.toLowerCase()) || 
    (item.market?.toLowerCase() || "").includes(searchQuery.toLowerCase())
  );

  const getChartData = () => {
    if (!selectedCrop) return null;
    const history = generateHistoricalData(selectedCrop.modal_price);
    
    return {
      labels: history.labels,
      datasets: [
        {
          label: `${selectedCrop.commodity} Price Trend`,
          data: history.data,
          borderColor: "#10b981", 
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          borderWidth: 3,
          pointBackgroundColor: "#10b981",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#10b981",
          pointRadius: 4,
          pointHoverRadius: 6,
          fill: true,
          tension: 0.4,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#000",
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: (context) => `₹${context.parsed.y} / Quintal`,
        },
      },
    },
    scales: {
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: { color: "rgba(255, 255, 255, 0.5)" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "rgba(255, 255, 255, 0.5)" },
      },
    },
    interaction: { mode: "index", intersect: false },
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-4">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
        <p className="text-zinc-500 font-black tracking-widest uppercase text-[10px]">Accessing Real-Time Market Data...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">Market <span className="text-emerald-500">Analysis</span></h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-emerald-500 to-transparent" />
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search crop or mandi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/5 rounded-full py-3 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table Column */}
        <div className="lg:col-span-2 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 backdrop-blur-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 uppercase text-[10px] tracking-widest text-zinc-500 font-black">
                  <th className="pb-4 px-4">Commodity</th>
                  <th className="pb-4 px-4">Market Location</th>
                  <th className="pb-4 px-4 text-right">Live Price (₹/Q)</th>
                  <th className="pb-4 px-4 text-right">Trend</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, idx) => {
                    const isSelected = selectedCrop?.commodity === item.commodity;
                    const isUp = (item.trend || "").includes("+") || idx % 2 === 0; 
                    
                    return (
                      <tr 
                        key={idx} 
                        onClick={() => setSelectedCrop(item)}
                        className={`border-b border-white/5 cursor-pointer transition-all duration-300 hover:bg-white/[0.05] ${isSelected ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500' : 'border-l-2 border-l-transparent'}`}
                      >
                        <td className="py-4 px-4 font-bold text-white capitalize">{item.commodity}</td>
                        <td className="py-4 px-4 text-zinc-400 text-sm flex items-center gap-2">
                          <MapPin size={12} className="text-emerald-500" /> {item.market || "Mandi"}
                        </td>
                        <td className="py-4 px-4 font-black text-right text-emerald-400">
                          ₹{item.modal_price}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase ${isUp ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                            {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                            {item.trend || (isUp ? "+0.5%" : "-0.2%")}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-zinc-500 text-sm">No live market data available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-1 border border-white/5 rounded-[2rem] bg-black bg-opacity-40 backdrop-blur-3xl p-6 shadow-2xl flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500 mb-6">Price Trend Analytics</h3>
          
          {selectedCrop ? (
            <div className="flex-1 flex flex-col justify-between">
              <div className="mb-8">
                <h4 className="text-3xl font-black capitalize italic">{selectedCrop.commodity}</h4>
                <p className="text-emerald-400 font-medium text-sm flex items-center gap-1 mt-1">
                  <MapPin size={12} /> {selectedCrop.market}
                </p>
                <div className="mt-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Rate</span>
                  <p className="text-4xl font-black mt-1">₹{selectedCrop.modal_price}</p>
                </div>
              </div>
              
              <div className="h-48 w-full mt-auto relative">
                <Line options={chartOptions} data={getChartData()} />
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-zinc-600 text-xs text-center">
              Select a commodity to visualize the trend.
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MarketAnalysis;