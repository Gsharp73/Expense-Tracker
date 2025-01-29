import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import transactionRoutes from "./Routers/Transactions.js";
import userRoutes from "./Routers/userRouter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

async function connectMongoDB() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 10000
        });
        console.log("MongoDB connected successfully");
        mongoose.connection.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB connection disconnected');
        });

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}
async function startServer() {
    try {
        await connectMongoDB();
        app.use(express.json());
        app.use(
            cors({
                credentials: true,
                methods: ["GET", "POST", "PUT", "DELETE"],
            })
        );
        app.use(helmet());
        app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
        app.use(morgan("dev"));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use("/api/v1", transactionRoutes);
        app.use("/api/auth", userRoutes);
        app.get("/", (req, res) => {
            res.send("Hello World!");
        });
        app.listen(port, () => {
            console.log(`Server is listening on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();