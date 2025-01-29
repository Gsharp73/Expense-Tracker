import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET; 

export const registerControllers = async (req, res) => {
    try {
        console.log("Register request received");
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: "User with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 3600 * 1000,
        });

        return res.status(201).json({ 
            msg: "User registration successful",
            user: { name: newUser.name, email: newUser.email, _id: newUser._id }
        });
    } catch (error) {
        console.error("Error in user registration:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const loginControllers = async (req, res) => {
    try {
        console.log("Login request received");
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

        // Set the JWT token as an HTTP-only cookie
        res.cookie("token", token, {
            httpOnly: true, // Prevent access to the cookie via JavaScript
            secure: process.env.NODE_ENV === "production", // Only use secure cookies in production
            maxAge: 3600 * 1000, 
        });

        return res.status(200).json({
            msg: `Welcome back, ${user.name}`,
            user: { name: user.name, email: user.email, _id: user._id }
        });
    } catch (error) {
        console.error("Error in user login:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Extract token from cookies

    if (!token) {
        return res.status(403).json({ msg: "Access Denied, No Token Provided" });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified; // Attach the verified user information to the request
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        console.log("Get all users request received");
        const userId = req.user.userId; // Access the user ID from the verified token

        const users = await User.find({ _id: { $ne: userId } }).select([
            "email",
            "name",
            "_id"
        ]);

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

