import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* --- AMBIENT BACKGROUND GLOW --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-emerald-900/10 blur-[100px] rounded-full" />

      <div className="relative z-10 text-center">
        {/* Animated Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 mb-8 shadow-2xl"
        >
          <AlertCircle size={40} className="text-emerald-500" />
        </motion.div>

        {/* Big 404 Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[10rem] md:text-[15rem] font-black italic leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-zinc-800 opacity-20 select-none"
        >
          404
        </motion.h1>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="-mt-10 md:-mt-20"
        >
          <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
            Lost in the <span className="text-emerald-500">Fields?</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-12">
            The route <span className="text-zinc-300 italic">"{location.pathname}"</span> does not exist.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link
              to="/"
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 text-black font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:scale-105 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)]"
            >
              <Home size={16} strokeWidth={3} />
              Return to Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:bg-white/10"
            >
              <ArrowLeft size={16} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
              Go Back
            </button>
          </div>
        </motion.div>
      </div>

      {/* Decorative Grid or Elements */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.5em] [writing-mode:vertical-lr]">
          FarmConnect • Error Protocol
        </p>
      </div>
    </div>
  );
};

export default NotFound;