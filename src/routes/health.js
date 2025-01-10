import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/health', async (req, res) => {
    try {
        // Check database connection
        const dbState = mongoose.connection.readyState;
        const dbStatus = {
            0: "disconnected",
            1: "connected",
            2: "connecting",
            3: "disconnecting"
        };

        res.json({
            status: 'ok',
            timestamp: new Date(),
            database: {
                status: dbStatus[dbState],
                connected: dbState === 1
            },
            uptime: process.uptime()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            error: error.message
        });
    }
});

export default router;
