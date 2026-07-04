import React, { useState, useEffect } from "react";
import { ArrowRight, ShieldCheck, Users, Leaf, BarChart3, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

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

  // WEATHER STATE
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(true);

  const API_KEY = "339f16d6a13cbb42549d056d68035ab4";

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        setWeather(res.data);
      } catch (err) {
        console.error("Weather fetch failed:", err);
      } finally {
        setLoadingWeather(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeather(26.8467, 80.9462)
    );
  }, []);

  const handleJoin = (target) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      navigate("/signup");
    } else {
      if (target === "farmer") {
        if (role === "farmer") {
          navigate("/farmer-dashboard");
        } else {
          alert("You are logged in as a Buyer. Redirecting to Marketplace.");
          navigate("/marketplace");
        }
      } else {
        navigate("/marketplace");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30 overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[50%] bg-emerald-900/5 blur-[150px] rounded-full" />
      </div>

      <Navbar openAuthModal={() => navigate("/login")} />

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 px-6">
        <div className="absolute inset-0 z-0">
          <img src={heroImg} alt="farm" className="h-full w-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#050505]" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div {...anim(0)} className="max-w-3xl">

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                Trusted by 10k+ Farmers
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.85] mb-6">
              Farm Fresh,<br />
              <span className="text-emerald-500">Directly</span> to You
            </h1>

            <p className="mt-4 text-zinc-200 text-lg md:text-xl font-semibold max-w-xl leading-relaxed">
              India's trusted marketplace connecting farmers and buyers.
              Get best prices, weather updates & smart farming tools.
            </p>

            <div className="mt-10 flex gap-4 flex-wrap">
              <button onClick={() => handleJoin("buyer")}
                className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-500 text-black font-black uppercase text-xs tracking-widest hover:bg-emerald-400 transition-all shadow-lg active:scale-95">
                Browse Marketplace <ArrowRight className="w-4 h-4 stroke-[3px]" />
              </button>

              <button onClick={() => handleJoin("farmer")}
                className="px-8 py-4 rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md hover:bg-white/10 font-black uppercase text-xs tracking-widest transition-all active:scale-95">
                Sell Your Produce
              </button>
            </div>

          </motion.div>
        </div>
      </section>

      {/* FEATURES / SPECIFICATION */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <motion.div {...anim(0)} className="text-center max-w-2xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-black uppercase">
              Why Choose <span className="text-emerald-500">FarmConnect</span>?
            </h2>

            <p className="mt-6 text-zinc-400 text-lg leading-relaxed">
              We empower farmers with technology, eliminate middlemen,
              and provide real-time insights for better profits and smarter decisions.
            </p>
          </motion.div>

          {/* CARDS */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div key={f.title} {...anim(i)} className="group">

                <div className="relative p-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.06] to-white/[0.02]
                                border border-white/10 backdrop-blur-xl
                                hover:border-emerald-500/40 transition-all duration-300
                                hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(16,185,129,0.25)]">

                  <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-emerald-500/10 mb-6">
                    <f.icon className="text-emerald-500 w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition">
                    {f.title}
                  </h3>

                  <p className="text-zinc-400 text-sm">
                    {f.desc}
                  </p>

                  <div className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100
                                  bg-emerald-500/5 blur-2xl transition duration-300" />
                </div>

              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WEATHER + MARKET */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">

          <div className="bg-zinc-900/40 p-10 rounded-[3rem] backdrop-blur-xl border border-white/10">
            <h2 className="text-3xl font-bold mb-6">
              Weather <span className="text-emerald-500/50">Report</span>
            </h2>

            <div className="min-h-[300px] flex items-center justify-center">
              {loadingWeather ? (
                <p className="text-emerald-500">Loading...</p>
              ) : (
                <WeatherWidget data={weather} />
              )}
            </div>
          </div>

          <div className="bg-zinc-900/40 p-10 rounded-[3rem] backdrop-blur-xl border border-white/10">
            <h2 className="text-3xl font-bold mb-6">
              Market <span className="text-emerald-500/50">Pulse</span>
            </h2>
            <MarketPrices />
          </div>

        </div>
      </section>

      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;