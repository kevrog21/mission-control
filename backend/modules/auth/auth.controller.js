import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

import User from "../users/Users.model.js"
import UserSettings from "../users/usersettings.model.js"
import DailyReviewQuestion from "../mission-control/daily-review/DailyReviewQuestions.model.js"
import fitnessUserProfile from "../fitness/FitnessUserProfiles.model.js"
import { defaultDailyReviewQuestions } from "../mission-control/daily-review/DailyReviewQuestions.seed.js"

dotenv.config()

export const registerUser = async (req, res, next) => {
    try {
        const { email, password, app } = req.body

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

        const appSettings = {
            missionControl: {
                enabled: false,
                connectedAt: null,
            },

            fitness: {
                enabled: false,
                connectedAt: null,
            },

            recipe: {
                enabled: false,
                connectedAt: null,
            },
        }

        if (appSettings[app]) {
            appSettings[app] = {
                enabled: true,
                connectedAt: new Date(),
            }
        }

        await UserSettings.create({
            userId: user._id,

            apps: appSettings,

            preferences: {
                theme: "system",
                timezone: "UTC",
                startOfWeek: "monday",
            },
        })

        if (app === "missionControl") {

            const questionsToInsert = defaultDailyReviewQuestions.map(q => ({
                ...q,
                userId: user._id,
            }))

            await DailyReviewQuestion.insertMany(questionsToInsert)
        }

        if (app === "fitness") {
            await fitnessUserProfile.create({
                userId: user._id,
            })
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