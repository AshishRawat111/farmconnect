const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');
const { syncMandiData } = require('./controllers/cropController');
const weatherRoutes = require("./routes/weatherRoutes");


require('dotenv').config();

const app = express();
connectDB();

app.use(cors({
  origin:"https://itsfarmconnect.netlify.app"
})); 
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);

app.use('/api/mandi', require('./routes/mandiRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use("/api/weather", weatherRoutes);
app.use('/uploads', express.static('uploads'));

cron.schedule('0 * * * *', () => {
  syncMandiData();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});