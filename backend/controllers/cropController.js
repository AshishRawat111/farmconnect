const Crop = require("../models/Crop");

// 1. Add Crop Logic
exports.addCrop = async (req, res) => {
  try {
    const { cropName, category, price, quantity, location, farmerName, farmerEmail, farmerPhone } = req.body;
    
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Not authorized" });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image missing!" });
    }

    const image = req.file.path.replace(/\\/g, "/"); 

    const newCrop = await Crop.create({
      cropName,
      category,
      price,
      quantity,
      location,
      farmer: req.user.id,
      image,
      farmerName,    // Manually added name
      farmerEmail,   // Manually added email
      farmerPhone,   // Manually added phone
    });

    res.status(201).json({ success: true, data: newCrop });
  } catch (error) {
    console.error("Add Crop Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. Get All Crops
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: crops.length, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Get Farmer's Own Crops
exports.getFarmerCrops = async (req, res) => {
  try {
    const crops = await Crop.find({ farmer: req.user.id });
    res.status(200).json({ success: true, data: crops });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Delete Crop
exports.deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ success: false, message: "Crop not found" });
    if (crop.farmer.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: "User not authorized" });
    }
    await crop.deleteOne();
    res.status(200).json({ success: true, message: "Crop removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};