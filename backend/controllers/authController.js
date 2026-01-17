import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/Users.model.js"
import dotenv from "dotenv"

dotenv.config()

export const registerUser = async (req, res, next) => {
    try {
        const { email, password, name } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }

        const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(409).json({ message: "User already exists" })
        }

        const saltRounds = 12
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            email,
            password: passwordHash,
            name
        })

        res.status(201).json({
            id: user._id,
            email: user.email,
            name: user.name
        })
    } catch (err) {
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        
        if ( !email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password"})
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.json({
            token,
            user: {
                id: user._id,
                email: user.email,
                name: user.name
            }
        })
    } catch (err) {
        next(err)
    }
}

export const refreshAccessToken = (req, res, next) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token required" })
    }

    try {
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        )

        const newAccessToken = jwt.sign(
            { userID: decoded.userId},
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        )

        res.json({ token: newAccessToken })

    } catch (err) {
        return res.status(401).json({ message: "Invalid refresh token" })
    }
}