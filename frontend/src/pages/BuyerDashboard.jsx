import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, User, Tag, Loader2, Search, Store } from "lucide-react";
import API from "../api";

const BuyerDashboard = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllCrops = async () => {
    try {
      setLoading(true);
      const res = await API.get("/crops/all");
      if (res.data && Array.isArray(res.data.data)) {
        setCrops(res.data.data);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCrops();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[400px] h-[400px] bg-emerald-900/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 pt-32 pb-20 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Store className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Live Marketplace</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              Mandi <span className="text-emerald-500">Explorer</span>
            </h1>
          </motion.div>

          {/* Stats / Info */}
          <div className="flex gap-4">
            <div className="bg-white/[0.02] border border-white/5 px-6 py-3 rounded-2xl backdrop-blur-xl">
               <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Available Stock</p>
               <p className="text-xl font-black text-white">{crops.length} Items</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
            <p className="text-zinc-500 font-black tracking-widest uppercase text-[10px]">Updating Live Inventory...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {crops.map((crop, idx) => (
              <motion.div
                key={crop._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-emerald-500/40 transition-all duration-500 shadow-2xl"
              >
                {/* Crop Image */}
                <div className="h-52 overflow-hidden relative border-b border-white/5">
                  <img 
                    src={`http://localhost:5000/${crop.image?.replace(/\\/g, '/')}`} 
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt={crop.cropName}
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Fasal+Image"; }}
                  />
                  <div className="absolute top-4 right-4">
                    <span className="text-[9px] bg-black/60 backdrop-blur-md text-emerald-400 border border-white/10 px-3 py-1 rounded-full uppercase font-black tracking-widest">
                      {crop.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  {/* Identity & Price */}
                  <div className="mb-4">
                    <h3 className=" text-2xl uppercase italic tracking-tighter text-white mb-1 truncate">{crop.cropName}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-black text-2xl italic tracking-tighter">₹{crop.price}</span>
                      <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">/ per kg</span>
                    </div>
                  </div>

                  <p className="text-zinc-400 text-xs font-bold mb-6 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    In Stock: <span className="text-zinc-100">{crop.quantity} kg</span>
                  </p>

                  {/* Seller Details Card */}
                  <div className="bg-white/[0.03] rounded-3xl p-5 border border-white/5 group-hover:bg-white/[0.05] transition-colors">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-emerald-500 font-black mb-4">Seller Details</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400">
                          <User size={12} />
                        </div>
                        <span className="text-xs font-bold text-zinc-200 truncate">{crop.farmerName}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-emerald-500/70">
                          <Phone size={12} />
                        </div>
                        <span className="text-xs font-black text-emerald-500">{crop.farmerPhone}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-400">
                          <Mail size={12} />
                        </div>
                        <span className="text-[10px] font-medium text-zinc-400 truncate">{crop.farmerEmail}</span>
                      </div>

                      <div className="pt-2 flex items-start gap-2 text-zinc-500">
                        <MapPin size={14} className="text-emerald-500 shrink-0" />
                        <span className="text-[10px] font-bold leading-tight uppercase tracking-tight">{crop.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {!loading && crops.length === 0 && (
          <div className="text-center py-40 border border-dashed border-white/5 rounded-[3rem]">
            <Search className="mx-auto text-zinc-800 mb-4" size={48} />
            <p className="text-zinc-600 font-black uppercase tracking-widest text-xs italic">Mandi mein abhi koi fasal uplabd nahi hai.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;