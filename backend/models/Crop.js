const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  cropName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: String, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String },
  // Mandatory Seller Details for the card
  farmerName: { type: String, required: true },
  farmerEmail: { type: String, required: true },
  farmerPhone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Crop", cropSchema);