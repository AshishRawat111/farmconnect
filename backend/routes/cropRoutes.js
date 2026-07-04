const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const { 
  addCrop, 
  getAllCrops, 
  getFarmerCrops, 
  deleteCrop, 
  getLiveMarketRates 
} = require("../controllers/cropController");

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// --- PUBLIC ROUTES ---
router.get("/all", getAllCrops);
router.get("/live-rates", getLiveMarketRates); // Ye naya endpoint hai analytics ke liye

// --- PROTECTED ROUTES ---
router.post('/add', protect, upload.single('image'), addCrop); 
router.get("/my", protect, getFarmerCrops);
router.delete("/:id", protect, deleteCrop);

module.exports = router;