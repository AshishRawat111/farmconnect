
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Signup Logic
exports.signup = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Validate fields
        if (!username || !email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists."
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const result = await User.create({
            name: username,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            success: true,
            result,
            message: "Signup Successful!"
        });

    } catch (error) {
        console.error("SIGNUP ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Signup failed."
        });
    }
};

// Login Logic
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required."
            });
        }

        const existingUser = await User.findOne({
            name: username
        });

        if (!existingUser) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Incorrect password."
            });
        }

        return res.status(200).json({
            success: true,
            result: existingUser,
            message: "Login Successful!"
        });

    } catch (error) {
        console.error("LOGIN ERROR:", error);

        return res.status(500).json({
            message: error.message || "Login failed."
        });
    }
};
