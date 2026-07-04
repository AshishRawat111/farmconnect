import React from "react";
import { Droplets, Wind, Eye, Gauge, Loader2, MapPin } from "lucide-react";

const WeatherWidget = ({ data, loading }) => {
  // If no data is passed from parent yet, show loader
  if (loading || !data) {
    return (
      <div className="w-full p-20 flex justify-center items-center bg-white/[0.03] rounded-[2.5rem]">
        <Loader2 className="animate-spin text-emerald-500" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Main Temp Card */}
      <div className="p-10 bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 text-center shadow-2xl hover:bg-white/[0.05] transition-colors">
        <div className="flex items-center justify-center gap-2 mb-2">
          <MapPin size={16} className="text-emerald-500" />
          <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">
            {data.name}
          </h2>
        </div>
        
        <p className="text-9xl font-black bg-gradient-to-b from-white to-zinc-600 bg-clip-text text-transparent py-4 tracking-tighter">
          {Math.round(data.main.temp)}°C
        </p>

        <p className="text-emerald-500 font-black italic tracking-[0.3em] uppercase text-sm">
          {data.weather[0].description}
        </p>
      </div>

      {/* Note: The details grid is handled by the parent (Weather.jsx) 
          to prevent the visual "double stats" problem. */}
    </div>
  );
};

export default WeatherWidget;