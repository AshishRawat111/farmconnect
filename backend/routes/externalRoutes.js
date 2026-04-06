const express = require('express');
const router = express.Router();
const { getWeather, getMandiPrices } = require('../controllers/externalApiController');

router.get('/weather', getWeather);
router.get('/mandi', getMandiPrices);

module.exports = router;