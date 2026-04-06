const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup Logic
exports.signup = async (req, res) => {
    const { username, email, password, role } = req.body; 
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists." });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ 
            name: username, // Frontend ka username backend ke 'name' mein jayega
            email, 
            password: hashedPassword, 
            role 
        });

        res.status(201).json({ result, message: "Signup Successful! 🎉" });
    } catch (error) {
        res.status(500).json({ message: "Signup fail ho gaya." });
    }
};

// Login Logic
exports.login = async (req, res) => {
    const { username, password } = req.body; 
    try {
        // Username (name field) se user ko dhundna
        const existingUser = await User.findOne({ name: username });
        if (!existingUser) return res.status(404).json({ message: "User nahi mila." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(400).json({ message: "Password galat hai." });

        res.status(200).json({ result: existingUser, message: "Login Successful! 🔓" });
    } catch (error) {
        res.status(500).json({ message: "Login fail ho gaya." });
    }
};