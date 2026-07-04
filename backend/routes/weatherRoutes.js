// routes/weatherRoutes.js
const express = require("express");
const router = express.Router();
const { getWeather } = require("../controllers/weatherController");

// This MUST match your frontend call: API.get("/weather/current")
router.get("/current", getWeather); 

module.exports = router;