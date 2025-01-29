import User from "../models/UserSchema.js";
import bcrypt from "bcrypt";

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

        return res.status(201).json({ 
            msg: "User registration successful",
            user: newUser
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
            console.log('ye');
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }
        const userResponse = user.toObject();
        delete userResponse.password;
        return res.status(200).json({
            msg: `Welcome back, ${user.name}`,
            user: userResponse
        });
    } catch (error) {
        console.error("Error in user login:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const setAvatarController = async (req, res) => {
    try {
        console.log("Avatar update request received");
        const userId = req.params.id;
        const imageData = req.body.image;

        if (!userId || !imageData) {
            return res.status(400).json({ msg: "User ID and image are required" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                isAvatarImageSet: true,
                avatarImage: imageData
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: "User not found" });
        }

        return res.status(200).json({
            isSet: updatedUser.isAvatarImageSet,
            image: updatedUser.avatarImage
        });
    } catch (error) {
        console.error("Error in avatar update:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        console.log("Get all users request received");
        const userId = req.params.id;

        const users = await User.find(
            { _id: { $ne: userId } }
        ).select([
            "email",
            "username",
            "avatarImage",
            "_id"
        ]);

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};