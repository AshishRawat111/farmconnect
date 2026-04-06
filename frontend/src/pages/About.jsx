import React from "react";
import { motion } from "framer-motion";
import { Leaf, Users, ShieldCheck, Zap, ArrowRight, Globe } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const stats = [
  { label: "Active Farmers", value: "10K+" },
  { label: "Crops Listed", value: "500+" },
  { label: "Daily Transactions", value: "₹2M+" },
  { label: "Mandi Connects", value: "100+" },
];

const features = [
  {
    icon: Leaf,
    title: "Direct Sourcing",
    desc: "Removing middlemen to ensure farmers get 100% of their crop value directly from buyers.",
  },
  {
    icon: Zap,
    title: "Live Mandi Insights",
    desc: "Real-time weather data and market price fluctuations at your fingertips to plan harvests.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Listings",
    desc: "Every crop listed on The Mandi undergoes a basic verification for quality and location accuracy.",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden scroll-smooth antialiased selection:bg-emerald-500/30">
      <Navbar />

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[0%] left-[30%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 shadow-inner"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
              Our Mission
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9]"
          >
            Empowering the <br />
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-600 bg-[length:200%_200%] animate-[gradientMove_6s_ease_infinite] bg-clip-text text-transparent">
              Next-Gen
            </span>{" "}
            Farmer
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-zinc-400 text-lg md:text-xl font-medium leading-relaxed"
          >
            FarmConnect is a digital bridge built to modernize Indian agriculture by
            connecting local mandis directly to the global marketplace.
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative p-8 rounded-[2.5rem] bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)] overflow-hidden group transition-all duration-300"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-emerald-500/10 to-transparent" />
              <h3 className="text-4xl md:text-5xl font-black mb-2">
                {stat.value}
              </h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tight underline decoration-emerald-500/20 underline-offset-8">
              Why <span className="text-emerald-500">FarmConnect?</span>
            </h2>

            <div className="space-y-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="flex gap-6 p-8 rounded-[2rem] bg-white/[0.03] hover:bg-white/[0.06] backdrop-blur-xl border border-white/5 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_10px_30px_-10px_rgba(16,185,129,0.2)]"
                >
                  <div className="h-16 w-16 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/20 to-transparent border border-white/10 text-emerald-400 shadow-lg">
                    <f.icon size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-black italic uppercase mb-2">
                      {f.title}
                    </h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Box */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative aspect-square rounded-[3rem] bg-gradient-to-br from-emerald-500/20 to-transparent p-[1px]"
          >
            <div className="w-full h-full rounded-[3rem] bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 flex flex-col items-center justify-center text-center p-10 shadow-[0_0_80px_-20px_rgba(16,185,129,0.25)]">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-20 animate-pulse" />
                <Globe size={90} className="text-emerald-500 relative z-10" />
              </div>

              <h3 className="text-3xl md:text-4xl font-black italic uppercase mb-4">
                Digitizing Agriculture
              </h3>

              <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
                We are not just an app; we are a movement to ensure every farmer has the power of data and direct commerce in their pocket.
              </p>

              <button className="mt-8 px-8 py-3 bg-emerald-500 text-black font-black uppercase text-xs rounded-full shadow-[0_10px_30px_-10px_#10b981] hover:shadow-[0_20px_40px_-10px_#10b981] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 relative overflow-hidden">
                <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition"></span>
                Join the Network <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center p-10 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/[0.05] to-transparent border border-emerald-500/20 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.15)]">
          <Users className="text-emerald-500 mx-auto mb-6 opacity-60" size={48} />
          <h2 className="text-3xl md:text-4xl font-black italic uppercase mb-4">
            Built for the community
          </h2>
          <p className="text-zinc-400 text-lg leading-relaxed">
            FarmConnect is built by developers and agriculture experts who understand the struggles of 
            local mandis. Our goal is to bring transparency, efficiency, and growth to every rural household.
          </p>
        </div>
      </section>

      <Footer />

      {/* Gradient Animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default About;