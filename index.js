import {Bot} from "grammy"
import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";
import routes from './src/routes/index.js'
import healthRoutes from './src/routes/health.js'
import { errorHandler } from './src/middleware/error.handler.js'
import "./src/config/bot.js"
import "./src/on/action.handler.js"

config()

const app = express()

app.use(express.json())
app.use("/api/v1", routes)
app.use("/api/v1", healthRoutes)

// Error handling middleware
app.use(errorHandler)

const port = process.env.PORT || 5005
const dbUrl = process.env.DATABASE_URI

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        // Retry connection after 5 seconds
        setTimeout(connectDB, 5000);
    }
};

app.listen(port, async () => {
    await connectDB();
    console.log("Project is running on port:" + port);
});
