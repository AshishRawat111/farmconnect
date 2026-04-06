const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const multer = require("multer");
const cropController = require("../controllers/cropController");

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Destructuring functions from controller
const { addCrop, getAllCrops, getFarmerCrops, deleteCrop } = cropController;

// --- ROUTES ---

// 1. Get all crops (Public - No protection needed)
router.get("/all", getAllCrops);

// 2. Add a new crop (Private - 'protect' is MUST here)
// Note: Sirf EK baar define karein
router.post('/add', protect, upload.single('image'), addCrop); 

// 3. Get current farmer's crops (Private)
router.get("/my", protect, getFarmerCrops);

// 4. Delete a crop (Private)
router.delete("/:id", protect, deleteCrop);

module.exports = router;