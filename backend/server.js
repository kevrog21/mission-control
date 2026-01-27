import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from 'cors'

import authRouter from './routes/auth.routes.js'
import usersRouter from './routes/users.routes.js'
import dailyReviewQuestionsRouter from './routes/dailyReview.routes.js'
// import usersRouter from './routes/users.js'
import { authLimiter } from './middleware/rateLimiter.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://gtd.mydomain.com",
    ],
    credentials: true,
  })
)

app.use(express.json())

if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
        console.log(`${req.method} ${req.originalUrl}`)
        next()
    });
}

app.use("/api/auth", authLimiter, authRouter)
app.use("/api", usersRouter, dailyReviewQuestionsRouter)
// app.use('/api/users', usersRouter)

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok", 
        env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    })
})

app.use("/api", (req, res) => {
    res.status(404).json({ error: "API route not found" });
})

app.use((err, req, res, next) => {
    console.error(err);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        error: err.message || "Internal Server Error",
    })
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");

        const server = app.listen(PORT, () => {
            console.log(`Mission Control Server running on port ${PORT}`);
        });

        process.on("SIGINT", async () => {
            console.log("Shutting down gracefully...");
            await mongoose.connection.close();
            server.close(() => {
                console.log("Process terminated");
                process.exit(0);
            });
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err)
        process.exit(1);
    })