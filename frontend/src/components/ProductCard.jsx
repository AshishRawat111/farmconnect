import React from "react";
import { MapPin, Star } from "lucide-react";

const ProductCard = ({
  name,
  price,
  unit,
  farmer,
  location,
  rating,
  image,
  organic,
}) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-md hover:shadow-xl transition duration-300">
      
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Organic Badge */}
        {organic && (
          <span className="absolute left-3 top-3 px-2 py-1 text-xs rounded-full bg-green-500 text-white">
            Organic
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        
        {/* Title + Price */}
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-white">{name}</h3>

          <span className="text-lg font-bold text-green-400">
            {price}
            <span className="text-xs text-gray-300">/{unit}</span>
          </span>
        </div>

        {/* Farmer */}
        <p className="mt-1 text-sm text-gray-300">{farmer}</p>

        {/* Location + Rating */}
        <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {location}
          </span>

          <span className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> {rating}
          </span>
        </div>

        {/* Button */}
        <button className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-400 text-white text-sm font-medium hover:scale-105 transition">
          Contact Farmer
        </button>
      </div>
    </div>
  );
};

export default ProductCard;