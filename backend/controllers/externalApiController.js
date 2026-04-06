const axios = require('axios');

exports.getWeather = async (req, res) => {
    try {
        const { city } = req.query; 
        const apiKey = process.env.WEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        const response = await axios.get(url);
        const data = response.data;

        res.json({
            temp: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            city: data.name
        });
    } catch (error) {
        console.error("Weather Error:", error.message);
        res.status(500).json({ message: "Weather data fetch failed" });
    }
};

// --- UPDATED MANDI PRICE LOGIC ---
exports.getMandiPrices = async (req, res) => {
    try {
        // Frontend se 'state' ya 'commodity' filter mangwa sakte hain
        const { state, commodity } = req.query;
        const govApiKey = process.env.GOV_API_KEY; // .env mein key dalo

        // Base URL (Govt Data Portal)
        let url = `https://api.data.gov.in/resource/9ef271fd-9941-47e5-adc4-ad741001a0ef?api-key=${govApiKey}&format=json&limit=20`;

        // Agar user filter bhejta hai toh URL mein add karo
        if (state) url += `&filters[state]=${state}`;
        if (commodity) url += `&filters[commodity]=${commodity}`;

        const response = await axios.get(url);

        // Data ko clean karke sirf kaam ki cheezein bhej rahe hain
        const cleanData = response.data.records.map(item => ({
            state: item.state,
            district: item.district,
            market: item.market,
            commodity: item.commodity,
            variety: item.variety,
            min_price: item.min_price,
            max_price: item.max_price,
            modal_price: item.modal_price, // Yeh main bhav hota hai
            updated_at: item.arrival_date
        }));

        res.json({
            success: true,
            total: response.data.total,
            records: cleanData
        });

    } catch (error) {
        console.error("Mandi API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ 
            message: "Mandi price fetch failed",
            error: error.message 
        });
    }
};