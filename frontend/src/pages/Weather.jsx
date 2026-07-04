import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WeatherWidget from "../components/WeatherWidget";
import { Card } from "../components/ui/card";
import { Droplets, Wind, Eye, Gauge, Loader2, X, Calendar } from "lucide-react";
import axios from "axios";

const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForecast, setShowForecast] = useState(false);
  const fetchedRef = useRef(false);

  const API_KEY = "339f16d6a13cbb42549d056d68035ab4";

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (fetchedRef.current) return;

    const fetchWeather = async (lat, lon) => {
      try {
        setLoading(true);
        const [currentRes, forecastRes] = await Promise.all([
          axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`),
          axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
        ]);

        setCurrentWeather(currentRes.data);
        setForecast(forecastRes.data);
        fetchedRef.current = true;
      } catch (error) {
        console.error("Weather API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
      () => fetchWeather(26.8467, 80.9462) // Default: Lucknow
    );
  }, []);

  if (loading) {
    return (
      <div className="h-screen bg-black flex flex-col items-center justify-center text-emerald-500">
        <Loader2 className="animate-spin mb-3" size={40} />
        <p className="text-xs uppercase tracking-widest text-zinc-400">Syncing Satellite Data...</p>
      </div>
    );
  }

  // Real-time details derived from the single source of truth
  const details = currentWeather ? [
    { icon: Droplets, label: "Humidity", value: `${currentWeather.main.humidity}%`, color: "text-blue-400" },
    { icon: Wind, label: "Wind Speed", value: `${(currentWeather.wind.speed * 3.6).toFixed(1)} km/h`, color: "text-zinc-400" },
    { icon: Eye, label: "Visibility", value: `${currentWeather.visibility / 1000} km`, color: "text-white" },
    { icon: Gauge, label: "Pressure", value: `${currentWeather.main.pressure} hPa`, color: "text-orange-400" },
  ] : [];

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <header className="flex justify-between items-end mb-10">
          <h1 className="text-4xl font-black italic uppercase tracking-tighter">
            Weather <span className="text-emerald-500">Forecast.</span>
          </h1>
          <button 
            onClick={() => setShowForecast(true)}
            className="text-[10px] font-black uppercase tracking-widest border border-emerald-500/30 px-4 py-2 rounded-full text-emerald-500 hover:bg-emerald-500 hover:text-black transition-all"
          >
            View 5-Day Outlook
          </button>
        </header>

        {/* Passing data down as props to avoid second API call */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="cursor-pointer"
          onClick={() => setShowForecast(true)}
        >
          <WeatherWidget data={currentWeather} loading={false} />
        </motion.div>

        {/* Grid is hidden if WeatherWidget already shows these stats to prevent "Twice" look */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {details.map((d, index) => (
            <Card key={index} className="p-6 bg-white/5 border-white/10 backdrop-blur-2xl hover:border-emerald-500/50 transition-all group">
              <div className="flex flex-col items-center gap-3">
                <d.icon className={`${d.color} group-hover:scale-110 transition-transform`} size={24} />
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{d.label}</p>
                <p className="text-2xl font-black">{d.value}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 5-DAY FORECAST MODAL */}
      <AnimatePresence>
        {showForecast && forecast && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-zinc-900 border border-white/10 p-8 rounded-[3rem] w-full max-w-lg relative"
            >
              <button onClick={() => setShowForecast(false)} className="absolute right-8 top-8 text-zinc-500 hover:text-white transition-colors">
                <X size={32} />
              </button>

              <div className="flex items-center gap-3 mb-8">
                <Calendar className="text-emerald-500" />
                <h2 className="text-2xl font-black uppercase tracking-tight">5-Day Outlook</h2>
              </div>

              <div className="space-y-3">
                {forecast.list
                  .filter((_, i) => i % 8 === 0)
                  .map((day, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/5">
                      <span className="font-bold text-zinc-400">
                        {new Date(day.dt * 1000).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' })}
                      </span>
                      <div className="flex items-center gap-4">
                        <span className="capitalize text-[10px] text-emerald-500 font-black tracking-widest">{day.weather[0].main}</span>
                        <span className="text-xl font-black">{Math.round(day.main.temp)}°C</span>
                      </div>
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
};

export default Weather;