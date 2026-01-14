import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"

import usersRouter from './routes/users.js'

dotenv.config()
const app = express()

app.use(express.json())

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("mission control and MongoDB connected successfully"))
    .catch((err) => console.error("MongoDB connection error: ", err))

app.use('/api/users', usersRouter)

app.get("/api/health", (req, res) => {
    res.json({status: "OK", server: "mission-control-backend"})
})

app.get("/", (req, res) => {
    res.send("mission control API is running...")
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`)
})