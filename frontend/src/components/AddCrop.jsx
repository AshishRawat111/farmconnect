import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Upload, Loader2, Sparkles, PlusCircle } from "lucide-react";
import toast from "react-hot-toast"; // 👈 Step 1: Import Toast

const AddCrop = ({ onCropAdded }) => {
  const [formData, setFormData] = useState({
    cropName: "",
    price: "",
    quantity: "",
    location: "",
    category: "Grains",
    farmerName: "",
    farmerEmail: "",
    farmerPhone: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Check for image using Toast instead of alert
    if (!image) { 
      toast.error("Kripya fasal ki photo upload karein! 📸"); 
      return; 
    }
    
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      Object.keys(formData).forEach(key => data.append(key, formData[key]));
      data.append("image", image);

      const res = await axios.post("http://localhost:5000/api/crops/add", data, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.success) {
        // ✅ Success Toast - Premium Apple Style
        toast.success(`${formData.cropName} Market mein add ho gayi! 🌾`);
        
        // Reset Form
        setFormData({ 
          cropName: "", price: "", quantity: "", location: "", 
          category: "Grains", farmerName: "", farmerEmail: "", farmerPhone: "" 
        });
        setImage(null); 
        setPreview(null);

        // Refresh Dashboard List
        if (onCropAdded) onCropAdded();
      }
    } catch (err) {
      // ❌ Error Toast
      const errorMsg = err.response?.data?.message || "Fasal add nahi ho pai ❌";
      toast.error(errorMsg);
    } finally { 
      setLoading(false); 
    }
  };

  const inputStyles = "w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 px-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm text-white placeholder:text-zinc-600";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden mb-12"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <PlusCircle className="text-emerald-400" size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
            Add New <span className="text-emerald-500">Crop</span> 🌾
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Global Marketplace Entry</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="text" name="cropName" value={formData.cropName} onChange={handleChange} placeholder="Crop Name" className={inputStyles} required />
          
          <div className="relative">
            <select name="category" value={formData.category} onChange={handleChange} className={`${inputStyles} appearance-none cursor-pointer`}>
              <option value="Grains" className="bg-zinc-900">Grains</option>
              <option value="Vegetables" className="bg-zinc-900">Vegetables</option>
              <option value="Fruits" className="bg-zinc-900">Fruits</option>
              <option value="Pulses" className="bg-zinc-900">Pulses</option>
              <option value="Others" className="bg-zinc-900">Others</option>
            </select>
            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">▼</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price per kg" className={inputStyles} required />
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity in kg" className={inputStyles} required />
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/60 mb-6 flex items-center gap-2">
            <Sparkles size={12} /> Farmer Contact Details
          </p>
          
          <div className="space-y-5">
            <input type="text" name="farmerName" value={formData.farmerName} onChange={handleChange} placeholder="Your Full Name" className={inputStyles} required />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input type="email" name="farmerEmail" value={formData.farmerEmail} onChange={handleChange} placeholder="Contact Email" className={inputStyles} required />
              <input type="text" name="farmerPhone" value={formData.farmerPhone} onChange={handleChange} placeholder="WhatsApp Number" className={inputStyles} required />
            </div>
            
            <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location (Village/City)" className={inputStyles} required />
          </div>
        </div>

        {/* Image Upload Area */}
        <div className="group relative">
          <label className="flex flex-col items-center justify-center w-full min-h-[200px] bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-emerald-500/40 transition-all cursor-pointer overflow-hidden">
            {preview ? (
              <div className="w-full h-full relative">
                <img src={preview} alt="Preview" className="w-full h-64 object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white">Click to change photo</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center p-6 text-center">
                <Upload className="text-zinc-600 group-hover:text-emerald-500 transition-colors mb-3" size={32} />
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300">Upload Crop Image</p>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={loading} 
          className="w-full mt-4 flex items-center justify-center gap-3 py-5 rounded-2xl bg-emerald-500 text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-emerald-400 transition-all hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)] active:scale-[0.98] disabled:opacity-50"
        >
          {loading ? (
            <><Loader2 className="animate-spin" size={16} /> Finalizing Listing...</>
          ) : (
            "Add Crop Listing"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default AddCrop;