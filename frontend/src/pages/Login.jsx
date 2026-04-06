import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn, Sparkles, ArrowRight, UserCircle } from "lucide-react";
import API from "../api";
import { AuthContext } from "../Context/AuthContext.jsx";
import toast from "react-hot-toast"; // 👈 Added This

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [form, setForm] = useState({ 
    email: "", 
    password: "",
    role: "farmer" 
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data);
      
      // ✅ SUCCESS TOAST
      toast.success(`Welcome Back! Login Successful 🚀`);

      const userRole = res.data.user?.role || res.data.role || form.role;

      if (userRole === "farmer") {
        navigate("/farmer-dashboard");
      } else if (userRole === "buyer") {
        navigate("/buyer-dashboard");
      } else {
        toast.error("Role not identified! ❌");
      }
    } catch (err) {
      console.error(err);
      // ❌ ERROR TOAST
      toast.error(err.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md relative z-10">
        <div className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Welcome Back</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
              Login to <span className="text-emerald-500">FarmConnect</span>
            </h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Login as</label>
              <div className="relative group">
                <UserCircle className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                <select name="role" value={form.role} onChange={handleChange} className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm appearance-none cursor-pointer">
                  <option value="farmer" className="bg-zinc-900">Farmer</option>
                  <option value="buyer" className="bg-zinc-900">Buyer</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm" placeholder="you@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Password</label>
                <span className="text-[9px] font-black uppercase text-emerald-500/50 cursor-pointer hover:text-emerald-400 transition-colors">Forgot?</span>
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600 group-focus-within:text-emerald-500 transition-colors" />
                <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-emerald-500/50 focus:bg-white/[0.05] transition-all font-bold text-sm" placeholder="Enter your password" />
              </div>
            </div>

            <button type="submit" className="w-full mt-4 flex items-center justify-center gap-3 py-5 rounded-2xl bg-emerald-500 text-black font-black uppercase text-[10px] tracking-[0.3em] hover:bg-emerald-400 transition-all hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)] active:scale-[0.98]">
              Login <LogIn className="w-4 h-4" strokeWidth={3} />
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-white/5 text-center">
            <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              Don't have an account?{" "}
              <span className="text-emerald-500 hover:text-white cursor-pointer transition-all flex items-center gap-1 group" onClick={() => navigate("/signup")}>
                Sign Up <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;