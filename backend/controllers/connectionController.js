const Connection = require('../models/Connection');

exports.createConnection = async (req, res) => {
    try {
        const { farmerId, cropId } = req.body;
        const buyerId = req.user.id; // Auth middleware se milega

        // Check karein ki kya pehle se request bheji gayi hai
        const existing = await Connection.findOne({ buyer: buyerId, crop: cropId });
        if (existing) return res.status(400).json({ message: "Already requested!" });

        const newConn = new Connection({
            buyer: buyerId,
            farmer: farmerId,
            crop: cropId
        });

        await newConn.save();
        res.status(201).json({ success: true, message: "Connection request sent to Farmer!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};