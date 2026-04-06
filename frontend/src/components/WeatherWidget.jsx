import React from "react";
import { Cloud, Sun, Droplets, Wind } from "lucide-react";

const forecasts = [
  { day: "Today", icon: Sun, temp: "32°C", desc: "Sunny" },
  { day: "Tue", icon: Cloud, temp: "28°C", desc: "Cloudy" },
  { day: "Wed", icon: Droplets, temp: "25°C", desc: "Rain" },
  { day: "Thu", icon: Sun, temp: "30°C", desc: "Sunny" },
  { day: "Fri", icon: Wind, temp: "27°C", desc: "Windy" },
];

const WeatherWidget = () => {
  return (
    <div className="rounded-2xl p-6 text-white bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg hover:shadow-xl transition duration-300">
      
      {/* Current Weather */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">Current Weather</p>
          <p className="text-4xl font-bold">32°C</p>
          <p className="mt-1 text-sm opacity-80">
            Sunny · Humidity 65%
          </p>
        </div>

        <Sun className="w-16 h-16 opacity-80 animate-pulse" />
      </div>

      {/* Forecast */}
      <div className="mt-6 flex justify-between gap-2">
        {forecasts.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.day}
              className="flex flex-col items-center gap-1 text-xs bg-white/10 px-2 py-2 rounded-lg backdrop-blur-md"
            >
              <span className="opacity-70">{f.day}</span>
              <Icon className="w-4 h-4" />
              <span className="font-medium">{f.temp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherWidget;