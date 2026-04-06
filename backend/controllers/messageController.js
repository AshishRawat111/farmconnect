const Message = require('../models/Message');

// 1. Naya Message Save Karna
exports.saveMessage = async (req, res) => {
    try {
        const { connectionId, senderId, text } = req.body;
        const newMessage = await Message.create({
            connection: connectionId,
            sender: senderId,
            text
        });
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Chat History Fetch Karna (Connection ID ke basis pe)
exports.getChatHistory = async (req, res) => {
    try {
        const { connectionId } = req.params;
        const history = await Message.find({ connection: connectionId }).sort({ createdAt: 1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};