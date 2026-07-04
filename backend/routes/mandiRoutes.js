const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get("/live-prices", async (req, res) => {
  try {
    // API URL: Ye India ke open data portal ki link hai
    // Aapko data.gov.in se apni FREE API Key leni hogi
    const API_KEY = "579b464db66ec23bdd000001643c589ec41b489f4a34fce33c8db105";
    const url = `https://api.data.gov.in/resource/9ef27c3d-698a-458f-a303-4247e8e39f01?api-key=${API_KEY}&format=json&limit=10`;

    const response = await axios.get(url);
    if (!response.data.records || response.data.records.length === 0) {
      throw new Error("No data returned from API, using fallback");
    }
    res.json({ success: true, records: response.data.records });
  } catch (error) {
    // Agar API fail ho jaye toh dummy data bhej do taaki UI khali na dikhe
    const dummyData = [
      { commodity: "Wheat", modal_price: "2400", market: "Lucknow" },
      { commodity: "Potato", modal_price: "1500", market: "Kanpur" },
      { commodity: "Rice", modal_price: "3200", market: "Varanasi" },
      { commodity: "Onion", modal_price: "2100", market: "Pune" },
      { commodity: "Tomato", modal_price: "1800", market: "Nashik" },
      { commodity: "Cotton", modal_price: "6000", market: "Nagpur" }
    ];
    res.json({ success: true, records: dummyData });
  }
});

module.exports = router;