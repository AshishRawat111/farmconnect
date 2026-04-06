const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
    farmer: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    // Nayi fields manual contact ke liye
    farmerName: { type: String, required: true },
    farmerEmail: { type: String, required: true },
    farmerPhone: { type: String, required: true },
    
    cropName: { 
        type: String, 
        required: [true, "Fasal ka naam zaroori hai"] 
    },
    category: { 
        type: String, 
        required: true,
        enum: ['Grains', 'Vegetables', 'Fruits', 'Pulses', 'Others'] 
    },
    price: { 
        type: Number, 
        required: [true, "Price batana zaroori hai"] 
    },
    quantity: { 
        type: Number, 
        required: [true, "Quantity zaroori hai"] 
    },
    unit: { 
        type: String, 
        default: 'kg' 
    },
    location: { 
        type: String, 
        required: [true, "Location (Mandi/Village) zaroori hai"] 
    },
    image: { 
        type: String, 
        default: "" 
    },
    description: { 
        type: String,
        trim: true 
    }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);