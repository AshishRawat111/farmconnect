const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
// Ensure this path matches your filename exactly (e.g., cropRoutes.js)
const cropRoutes = require('./routes/cropRoutes'); 
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors()); 
app.use(express.json()); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crops', cropRoutes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));