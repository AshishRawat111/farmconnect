import React, { useState } from 'react';
import { MapPin, IndianRupee, Weight, User, Phone, Mail, ChevronDown, ChevronUp } from 'lucide-react';

const CropCard = ({ crop }) => {
  const [showDetails, setShowDetails] = useState(false);

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
          {crop.category || "Crop"}
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

        {showDetails && (
          <div className="mt-3 p-3 bg-[#0f172a] rounded-lg border border-slate-700 space-y-2 fade-in">
            <div className="flex items-center text-slate-300 text-xs">
              <User size={12} className="mr-2 text-emerald-400" />
              <span>{crop.farmerName || "Farmer Name Not Available"}</span>
            </div>
            <div className="flex items-center text-slate-300 text-xs">
              <Phone size={12} className="mr-2 text-emerald-400" />
              <span>{crop.farmerPhone || "Phone Not Available"}</span>
            </div>
            <div className="flex items-center text-slate-300 text-xs">
              <Mail size={12} className="mr-2 text-emerald-400" />
              <span className="truncate">{crop.farmerEmail || "Email Not Available"}</span>
            </div>
          </div>
        )}

        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="w-full flex items-center justify-center bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 rounded-lg transition-colors mt-2">
          {showDetails ? (
            <>HIDE DETAILS <ChevronUp size={14} className="ml-1" /></>
          ) : (
            <>VIEW DETAILS <ChevronDown size={14} className="ml-1" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default CropCard;