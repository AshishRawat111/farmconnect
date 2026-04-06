import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const prices = [
  { name: "Wheat", price: "₹2,450", unit: "/quintal", change: 2.3, up: true },
  { name: "Rice", price: "₹3,100", unit: "/quintal", change: -1.1, up: false },
  { name: "Tomato", price: "₹45", unit: "/kg", change: 8.5, up: true },
  { name: "Onion", price: "₹32", unit: "/kg", change: -3.2, up: false },
  { name: "Potato", price: "₹22", unit: "/kg", change: 1.7, up: true },
  { name: "Corn", price: "₹1,800", unit: "/quintal", change: 0.5, up: true },
];

const MarketPrices = () => {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-6 shadow-xl hover:shadow-2xl transition duration-300">
      
      {/* Header */}
      <h3 className="text-xl font-semibold text-white">
        🌾 Live Market Prices
      </h3>
      <p className="text-sm text-gray-300 mb-4">
        Updated just now
      </p>

      {/* List */}
      <div className="space-y-3">
        {prices.map((p) => (
          <div
            key={p.name}
            className="flex items-center justify-between px-4 py-3 rounded-xl 
                       bg-white/5 hover:bg-white/10 transition duration-300 cursor-pointer"
          >
            {/* Left */}
            <div>
              <span className="font-medium text-white">{p.name}</span>
              <span className="ml-2 text-xs text-gray-400">{p.unit}</span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3">
              <span className="font-semibold text-white">{p.price}</span>

              <span
                className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full
                  ${p.up 
                    ? "bg-green-500/20 text-green-400" 
                    : "bg-red-500/20 text-red-400"}`}
              >
                {p.up ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {Math.abs(p.change)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPrices;