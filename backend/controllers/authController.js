import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/Users.model.js"
import dotenv from "dotenv"

import DailyReviewQuestion from "../models/DailyReviewQuestions.model.js"
import { defaultDailyReviewQuestions } from "../seed/defaultDailyReviewQuestions.js"

dotenv.config()

export const registerUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" })
        }

        const existingUser = await User.findOne({ email })
            if (existingUser) {
                return res.status(409).json({ message: "An account with that email already exists" })
        }

        const saltRounds = 12
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const user = await User.create({
            email,
            password: passwordHash,
        })

        const questionsToInsert = defaultDailyReviewQuestions.map(q => ({
            ...q,
            userId: user._id,
        }))

        await DailyReviewQuestion.insertMany(questionsToInsert)

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email
            },
        })
    } catch (err) {
        next(err)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        if (req.body.company) {
            return res.status(400).json({ message: "Invalid submission"})
        }
        
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
            { expiresIn: "1h" }
        )

        res.status(201).json({
            token,
            user: {
                id: user._id,
                email: user.email
            }
        })
    } catch (err) {
        next(err)
    }
}

export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
    return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
}