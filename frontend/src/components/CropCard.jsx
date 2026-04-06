import React from 'react';
import { MapPin, IndianRupee, Weight } from 'lucide-react';

const CropCard = ({ crop }) => {
  return (
    <div className="bg-[#1e293b] border border-slate-700 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all group">
      {/* Image Section */}
      <div className="h-40 overflow-hidden relative">
        <img 
          src={crop.image || 'https://via.placeholder.com/300'} 
          alt={crop.cropName} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
          {crop.category}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 space-y-3">
        <h3 className="text-white font-bold text-lg uppercase tracking-tight">{crop.cropName}</h3>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-green-400 font-bold">
            <IndianRupee size={14} className="mr-1" />
            <span>{crop.price}/kg</span>
          </div>
          <div className="flex items-center text-slate-400">
            <Weight size={14} className="mr-1" />
            <span>{crop.quantity}kg</span>
          </div>
        </div>

        <div className="flex items-center text-slate-400 text-xs border-t border-slate-700 pt-3">
          <MapPin size={12} className="mr-1 text-red-400" />
          <span className="truncate">{crop.location}</span>
        </div>

        <button className="w-full bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 rounded-lg transition-colors">
          VIEW DETAILS
        </button>
      </div>
    </div>
  );
};

export default CropCard;