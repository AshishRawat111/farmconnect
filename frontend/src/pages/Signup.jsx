import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Mail, Lock, UserCircle, ArrowRight, Sparkles } from "lucide-react";
import API from "../api";
import toast from "react-hot-toast"; // 👈 Step 1: Import Toast

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "farmer",
  });
  const [loading, setLoading] = useState(false); // Added loading state for better UX

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ❌ Password Match Check using Toast
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords match nahi ho rahe! ❌");
    }

    setLoading(true);
    try {
      await API.post("/auth/signup", form);
      
      // ✅ Success Toast
      toast.success("Account ban gaya! Login karein ✅", {
        duration: 4000,
        icon: '🎉',
      });
      
      navigate("/login");
    } catch (err) {
      console.error(err);
      // ❌ Error Toast
      const errorMsg = err.response?.data?.message || "Signup failed ho gaya ❌";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND GLOWS --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Card Container */}
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          
          {/* Top Branding/Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <span className="animate-pulse"><Sparkles className="w-3 h-3 text-emerald-400" /></span>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Join the Network</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              Create an <span className="text-emerald-500">Account</span>
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Full Name</label>
              <div className="relative group">
                <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="text" name="name" value={form.name} onChange={handleChange} required 
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm" 
                  placeholder="Your full name" 
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                <input 
                  type="email" name="email" value={form.email} onChange={handleChange} required 
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm" 
                  placeholder="you@example.com" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="password" name="password" value={form.password} onChange={handleChange} required 
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Confirm</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required 
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">I am a</label>
              <div className="relative group">
                <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                <select 
                  name="role" value={form.role} onChange={handleChange} 
                  className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm appearance-none cursor-pointer"
                >
                  <option value="farmer" className="bg-zinc-900">Farmer</option>
                  <option value="buyer" className="bg-zinc-900">Buyer</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-6 flex items-center justify-center gap-3 py-5 rounded-2xl bg-emerald-500 text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-emerald-400 transition-all hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : <>Sign Up <ArrowRight className="w-4 h-4" strokeWidth={3} /></>}
            </button>
          </form>

          {/* Footer Link */}
          <p className="mt-8 text-center text-zinc-500 text-[11px] font-bold uppercase tracking-widest">
            Already have an account?{" "}
            <span 
              className="text-emerald-500 hover:text-white cursor-pointer transition-colors underline underline-offset-4" 
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;