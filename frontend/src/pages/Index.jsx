import React, { useState } from "react";
import { ArrowRight, ShieldCheck, Users, Leaf, BarChart3, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WeatherWidget from "../components/WeatherWidget";
import MarketPrices from "../components/MarketPrices";
import ChatBot from "../components/ChatBot";

// Assets
import heroImg from "../assets/hero-farm.jpg";

const features = [
  { icon: Users, title: "Direct Connection", desc: "Connect farmers with buyers directly, no middlemen." },
  { icon: Leaf, title: "Organic Verified", desc: "Verified organic produce with quality assurance." },
  { icon: BarChart3, title: "Live Prices", desc: "Real-time market prices to get the best deals." },
  { icon: ShieldCheck, title: "Secure Trade", desc: "Safe and transparent transactions for everyone." },
];

const anim = (i) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" },
});

const Index = () => {
  const navigate = useNavigate();

  // Optimized Navigation Logic
  const handleJoin = (target) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      // Agar user logged in nahi hai, toh signup pe bhejein
      navigate("/signup"); 
    } else {
      // Agar logged in hai, toh check karein ki wo kahan jana chahta hai
      if (target === "farmer") {
        // "Sell Your Produce" click kiya
        if (role === "farmer") {
          navigate("/farmer-dashboard");
        } else {
          // Agar Buyer "Sell" click kare, toh use warn karke marketplace bhej dein
          alert("You are logged in as a Buyer. Redirecting to Marketplace.");
          navigate("/marketplace");
        }
      } else {
        // "Browse Marketplace" click kiya
        navigate("/marketplace");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* AMBIENT BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] bg-emerald-900/5 blur-[150px] rounded-full" />
      </div>

      {/* Navbar */}
      <Navbar openAuthModal={() => navigate("/login")} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImg} 
            alt="farm" 
            className="h-full w-full object-cover opacity-60 transition-opacity duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div {...anim(0)} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Trusted by 10k+ Farmers</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6 drop-shadow-2xl">
              Farm Fresh,<br />
              <span className="text-emerald-500">Directly</span> to You
            </h1>

            <p className="mt-4 text-zinc-200 text-lg md:text-xl font-semibold max-w-xl leading-relaxed drop-shadow-md">
              India's trusted marketplace connecting farmers and buyers. 
              Get best prices, weather updates & smart farming tools.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              {/* Marketplace Button */}
              <button
                onClick={() => handleJoin("buyer")}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 text-black font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-[0_10px_30px_-10px_rgba(16,185,129,0.6)] active:scale-95"
              >
                Browse Marketplace <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>

              {/* Farmer/Seller Button */}
              <button
                onClick={() => handleJoin("farmer")}
                className="px-8 py-4 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md hover:bg-white/10 font-black uppercase text-xs tracking-widest transition-all active:scale-95"
              >
                Sell Your Produce
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div {...anim(0)} className="text-center mb-20">
            <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Our Ecosystem</p>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
              Why <span className="text-emerald-500">FarmConnect?</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} {...anim(i)} className="group">
                  <div className="h-full flex flex-col p-8 rounded-[2.5rem] 
                    bg-white/[0.03] backdrop-blur-3xl border border-white/5 
                    hover:border-emerald-500/40 hover:bg-white/[0.07]
                    transition-all duration-500 relative overflow-hidden group-hover:-translate-y-2">
                    
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-white/5 text-emerald-500 mb-6 shadow-xl group-hover:rotate-6 transition-transform">
                      <Icon className="h-7 w-7" />
                    </div>

                    <h3 className="text-xl font-black italic uppercase tracking-tight mb-3 text-zinc-100">
                      {f.title}
                    </h3>

                    <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weather + Prices */}
      <section className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div {...anim(0)} className="group">
              <div className="h-full bg-zinc-900/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/5 group-hover:border-emerald-500/20 transition-colors shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-1 bg-emerald-500 rounded-full" />
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">Weather <span className="text-emerald-500/50">Report</span></h2>
                </div>
                <WeatherWidget />
              </div>
            </motion.div>

            <motion.div {...anim(1)} className="group">
              <div className="h-full bg-zinc-900/40 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/5 group-hover:border-emerald-500/20 transition-colors shadow-2xl">
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-1 bg-emerald-500 rounded-full" />
                  <h2 className="text-3xl font-black italic uppercase tracking-tighter">Market <span className="text-emerald-500/50">Pulse</span></h2>
                </div>
                <MarketPrices />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;