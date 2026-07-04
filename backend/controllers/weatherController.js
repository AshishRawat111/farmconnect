const axios = require("axios");

exports.getWeather = async (req, res) => {
  try {
    const city = req.query.city || "Itaunja";
    const API_KEY = process.env.WEATHER_API_KEY;

    // If no API key, return clean fallback immediately
    if (!API_KEY) {
      return res.status(200).json({
        name: city,
        main: { temp: 24, humidity: 51, pressure: 1009 },
        weather: [{ description: "Clear Sky" }],
        wind: { speed: 14.0 },
        visibility: 10000
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    res.status(200).json(response.data);
  } catch (error) {
    // Fallback data if API fails
    res.status(200).json({
      name: "Itaunja",
      main: { temp: 24, humidity: 51, pressure: 1009 },
      weather: [{ description: "Clear Sky" }],
      wind: { speed: 14.0 },
      visibility: 10000
    });
  }
};