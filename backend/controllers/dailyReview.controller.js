import DailyReviewQuestion from "../models/DailyReviewQuestions.model.js"
import DailyReviewResponse from "../models/DailyReviewResponses.model.js"
import { DateTime } from "luxon"

export async function getUserDailyReviewQuestions(req, res) {
    try {
        const questions = await DailyReviewQuestion.find({
            userId: req.userId,
            active: true,
        }).sort({ order: 1 })
        
        res.json(questions)
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch questions" })
    }
}

export async function postDailyReviewResponse(req, res) {
   
    // const userTimezone = req.userSettings.timezone
    const userTimezone = "America/New_York"
    const now = DateTime.now().setZone(userTimezone)

    const dailyReviewDate = DateTime
        .fromISO(req.body.date ?? now.toISODate(), { zone: userTimezone }).startOf("day")

    const today = now.startOf("day")

    if (dailyReviewDate.equals(today) && now.hour < 12) {
        return res.status(400).json({
        message: "Daily review can only be submitted after noon",
        })
    }

    console.log(req.userId)
    console.log("post daily review response is running", req.body)

    try {
        await DailyReviewResponse.create({
            userId: req.userId,
            date: dailyReviewDate.toJSDate(),
            responses: req.body.responses,
        })
        res.status(201).json("daily review response successfully submitted!")
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: "Daily review already exists for this date",
            })
        }
    }
}