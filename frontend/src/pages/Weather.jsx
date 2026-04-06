import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import WeatherWidget from "../components/WeatherWidget";
import { Card } from "../components/ui/card";
import { 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Loader2, 
  Calendar, 
  X
} from "lucide-react"; 
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);

  const API_KEY = "339f16d6a13cbb42549d056d68035ab4"; 

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );
        if (response.data) {
          setWeatherData(response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("API Error:", error);
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeather(26.8467, 80.9462)
    );
  }, [API_KEY]);

  const current = weatherData?.list?.[0];
  const todayDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  const details = [
    { icon: Droplets, label: "Humidity", value: current ? `${current.main.humidity}%` : "--" },
    { icon: Wind, label: "Wind Speed", value: current ? `${current.wind.speed} km/h` : "--" },
    { icon: Eye, label: "Visibility", value: current ? `${current.visibility / 1000} km` : "--" },
    { icon: Gauge, label: "Pressure", value: current ? `${current.main.pressure} hPa` : "--" },
  ];

  if (loading) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center text-emerald-500">
        <Loader2 className="animate-spin mb-3" size={40} />
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold">Loading Live Data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden antialiased">
      <Navbar />

      {/* 🌌 BACKGROUND GLOW */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-600/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[0%] left-[30%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 relative z-10">
        
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
            Weather <span className="text-emerald-500">& Forecast</span>
          </h1>
          <p className="text-zinc-500 text-xs mt-1">Real-time weather insights for your location.</p>
        </div>

        <div className="space-y-6">

          {/* MAIN WIDGET */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="cursor-pointer transition-all active:scale-[0.98] rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)]"
            onClick={() => setShowForecast(true)}
          >
            {weatherData && <WeatherWidget data={weatherData} />}
          </motion.div>

          {/* DETAILS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {details.map((d, index) => (
              <motion.div key={index} whileHover={{ y: -5, scale: 1.03 }}>
                <Card className="relative p-6 rounded-[2rem] bg-white/[0.04] backdrop-blur-xl border border-white/10 overflow-hidden shadow-lg">
                  
                  <div className="absolute top-3 right-4 flex items-center gap-1 text-[8px] text-zinc-600 font-bold uppercase">
                    <Calendar size={10} /> {todayDate}
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shadow-inner">
                      <d.icon size={22} />
                    </div>

                    <div className="text-center">
                      <p className="text-[9px] uppercase font-bold text-zinc-500 tracking-widest">
                        {d.label}
                      </p>
                      <p className="font-black text-xl mt-1">
                        {d.value}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 🌙 MODAL */}
      <AnimatePresence>
        {showForecast && weatherData && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setShowForecast(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/[0.05] backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] w-full max-w-lg relative shadow-[0_10px_40px_-10px_rgba(16,185,129,0.2)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowForecast(false)} 
                className="absolute right-6 top-6 text-zinc-500 hover:text-white transition"
              >
                <X size={28} />
              </button>

              <h2 className="text-2xl font-black mb-6 italic uppercase tracking-tighter">
                <span className="text-emerald-500">7-Day</span> Forecast
              </h2>

              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                {weatherData.list.filter(i => i.dt_txt.includes("12:00:00")).map((day, idx) => (
                  <div 
                    key={idx} 
                    className="flex justify-between items-center p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:bg-white/[0.06] transition"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-sm uppercase">
                        {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                      </span>
                      <span className="text-[10px] text-zinc-500">
                        {new Date(day.dt * 1000).toLocaleDateString('en-GB')}
                      </span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-black text-emerald-400 text-lg">
                        {Math.round(day.main.temp)}°C
                      </span>
                      <img 
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                        className="w-10 h-10" 
                        alt="icon"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Weather;