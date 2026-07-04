import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Package, MapPin, Tag, Plus, Loader2, Sparkles, LayoutDashboard } from "lucide-react";
import API from "../api";
import AddCrop from "../components/AddCrop";
import toast from "react-hot-toast"; // 👈 Added This
import MarketAnalysis from "../components/MarketAnalysis";
import AgriAgentChat from "../components/AgriAgentChat";

const FarmerDashboard = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("listed"); // "listed" | "analysis"

  const fetchCrops = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API.get("/crops/my"); 
      if (res.data && Array.isArray(res.data.data)) {
        setCrops(res.data.data);
      } else {
        setCrops([]); 
      }
    } catch (err) {
      console.error("Fetch Error 👉", err);
      setCrops([]); 
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCrops();
  }, [fetchCrops]);

  // ✅ IMPROVED DELETE WITH TOAST CONFIRMATION
  const deleteCrop = async (id) => {
    // Custom Apple Style Confirmation Toast
    toast((t) => (
      <span className="flex items-center gap-3">
        <b>Delete fasal?</b>
        <button 
          onClick={async () => {
            toast.dismiss(t.id);
            try {
              await API.delete(`/crops/${id}`);
              toast.success("Fasal hata di gayi hai! 🗑️");
              fetchCrops(); 
            } catch (err) {
              toast.error("Delete failed ❌");
            }
          }}
          className="bg-red-500 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase"
        >
          Yes
        </button>
        <button 
          onClick={() => toast.dismiss(t.id)}
          className="bg-zinc-800 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase"
        >
          No
        </button>
      </span>
    ), { duration: 5000 });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[300px] h-[300px] bg-emerald-900/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <LayoutDashboard className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Management Console</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Farmer <span className="text-emerald-500 underline decoration-white/5 underline-offset-8">Dashboard</span>
            </h1>
          </motion.div>
          
          <div className="flex items-center gap-4 bg-white/[0.02] border border-white/5 p-4 rounded-[2rem] backdrop-blur-xl">
             <div className="h-10 w-10 rounded-full bg-emerald-500 flex items-center justify-center text-black">
                <Plus size={20} strokeWidth={3} />
             </div>
             <div>
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Active Listings</p>
                <p className="text-xl font-black text-white">{crops.length}</p>
             </div>
          </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-1 md:p-2 mb-10 shadow-2xl overflow-hidden">
            {/* AddCrop component handle success via callback */}
            <AddCrop onCropAdded={() => {
              toast.success("Nayi fasal list ho gayi! 🌾");
              fetchCrops();
            }} />
        </div>

        {/* --- DUAL MODE TOGGLE --- */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white/[0.03] p-1 rounded-full border border-white/10 backdrop-blur-md">
            <button
              onClick={() => setActiveTab("listed")}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "listed" 
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Listed Crops
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === "analysis" 
                  ? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)]" 
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              Market Analysis
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "listed" ? (
            <motion.div
              key="listed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-10"
            >
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter">My Listed <span className="text-emerald-500">Crops</span></h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <Loader2 className="animate-spin text-emerald-500" size={40} />
              <p className="text-zinc-500 font-black tracking-widest uppercase text-[10px]">Syncing Database...</p>
            </div>
          ) : crops.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white/[0.01] rounded-[3rem] border border-dashed border-white/10">
              <Package className="mx-auto text-zinc-800 mb-4" size={48} />
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Abhi tak koi fasal add nahi ki gayi hai.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {crops.map((crop, idx) => (
                  <motion.div
                    key={crop._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[3rem] overflow-hidden hover:border-emerald-500/40 transition-all duration-500 shadow-2xl"
                  >
                    <div className="h-56 overflow-hidden relative">
                      {crop.image ? (
                        <img
                          src={`http://localhost:5000/${crop.image.replace(/\\/g, '/')}`}
                          alt={crop.cropName}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=No+Image+Available"; }}
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-zinc-900 text-zinc-700 font-black uppercase text-[10px] tracking-widest">No Image available</div>
                      )}
                      <div className="absolute top-5 right-5 bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
                          <p className="text-[9px] font-black uppercase text-emerald-400 tracking-widest flex items-center gap-2">
                            <Tag size={10} /> {crop.category || "General"}
                          </p>
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white mb-6 truncate">{crop.cropName}</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5">
                          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Price</p>
                          <p className="text-xl font-black text-emerald-500">₹{crop.price}<span className="text-[10px] text-zinc-600 font-medium">/kg</span></p>
                        </div>
                        <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/5 text-right">
                          <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest mb-1">Stock</p>
                          <p className="text-xl font-black text-white">{crop.quantity} kg</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-8">
                        <MapPin size={12} className="text-emerald-500" /> {crop.location}
                      </div>

                      <button
                        onClick={() => deleteCrop(crop._id)}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-black border border-red-500/20 hover:border-red-500 transition-all duration-300 font-black uppercase text-[10px] tracking-[0.2em]"
                      >
                        <Trash2 size={14} /> Delete Listing
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
            </motion.div>
          ) : (
            <motion.div
              key="analysis"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MarketAnalysis />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AgriAgentChat />
    </div>
  );
};

export default FarmerDashboard;