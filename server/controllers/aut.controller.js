import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
 // Ensure you have a User model

export const userSignup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create and save the user
        const user = await User.create({ username, email, password: hashPassword });

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error("Error during signup:", error.message);
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        });
    }
};

export const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            });
        }

        // Compare passwords
        const isPasswordMatch = await bcrypt.compare(password, userExist.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password",
            });
        }

        // Generate JWT token
        const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        // Successful login response
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: userExist._id,
                username: userExist.username,
                email: userExist.email,
            },
            token,
        });
    } catch (error) {
        console.error("Error during login:", error.message);
        res.status(500).json({
            success: false,
            message: "Error during login",
            error: error.message,
        });
    }
};