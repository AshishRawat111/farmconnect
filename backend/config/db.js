const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Console log check karne ke liye ki URI mil rahi hai ya nahi
        console.log("Connecting to URI:", process.env.MONGO_URI); 
        
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in .env file");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;