
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const cropRoutes = require('./routes/cropRoutes');
const { syncMandiData } = require('./controllers/cropController');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

const allowedOrigins = [
  'https://itsfarmconnect.netlify.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/mandi', require('./routes/mandiRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/weather', weatherRoutes);

app.use('/uploads', express.static('uploads'));

cron.schedule('0 * * * *', () => {
  syncMandiData();
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`FarmConnect server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
