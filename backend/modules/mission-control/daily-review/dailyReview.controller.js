import DailyReviewQuestion from "./DailyReviewQuestions.model.js"
import DailyReviewResponse from "./DailyReviewResponses.model.js"
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

export async function updateUserDailyReviewQuestions(req, res) {
    try {
        const { questions } = req.body

        const updates = questions.map(q => 
            DailyReviewQuestion.findByIdAndUpdate(
                q._id,
                {
                    order:q.order,
                    active: q.active,
                },
                { new: true }
            )
        )

        await Promise.all(updates)

        res.json({ message: "Questions updated" })
    } catch (err) {
        res.status(500).json({ message: "Failed to update questions" })
    }
}

export async function createDailyReviewQuestion(req, res) {
    try {

        console.log("creating new question runninggg")
        const userId = req.userId
        const questions = req.body

        console.log("userId", userId)
        console.log("questions", questions)

        console.log()

        if (!Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "No questions provided" })
        }

        function generateKey(label) {
            return label
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9 ]/g, "")
                .replace(/\s+/g, "_")
        }

        const formattedQuestions = questions.map((q, index) => {
            let baseKey = generateKey(q.label)

            return {
                userId,
                key: `${baseKey}_${Date.now()}_${index}`,
                label: q.label,
                type: q.type,
                allowCount: q.allowCount || false,
                active: true,
                order: q.order ?? index + 1,
            }
        })

        const createdQuestions = await DailyReviewQuestion.insertMany(formattedQuestions)

        res.status(201).json(createdQuestions)
        res.status(201).json("daily review question successfully added!")
    } catch (err) {
        console.error("Error creating daily review questions:", err)
        res.status(500).json({ message: "Failed to add question" })
    }
}

export async function getDailyReviewResponseForDate(req, res) {
    // const userTimezone = req.userSettings.timezone

    const userTimezone = "America/New_York"

    const { date } = req.query
    const userId = req.userId

    let targetDate

    if (date === "today") {
        targetDate = DateTime.now().setZone(userTimezone).startOf("day").toJSDate()
    } else {
        targetDate = DateTime.now().startOf("day").toJSDate()
    }

    const review = await DailyReviewResponse.findOne({
        userId,
        date: targetDate
    })

    res.json(review)
}

export async function getRecentDailyReviews(req, res) {
    try {
        console.log(req.userId)
        const reviews = await DailyReviewResponse
            .find({ userId: req.userId })
            .sort({ completedAt: -1 })
            .limit(7)
        res.json(reviews)
    } catch (err) {
        console.error("Failed to fetch recent reviews", err)

        res.status(500).json({ message: "Failed to fetch recent reviews"})
    }
}

export async function postDailyReviewResponse(req, res) {
    // const userTimezone = req.userSettings.timezone
    const userTimezone = "America/New_York"
    const now = DateTime.now().setZone(userTimezone)

    const dailyReviewDate = DateTime
        .fromISO(req.body.date ?? now.toISODate(), { zone: userTimezone }).startOf("day")

    const today = now.startOf("day")

    // if (dailyReviewDate.equals(today) && now.hour < 12) {
    //     return res.status(400).json({
    //     message: "Daily review can only be submitted after noon",
    //     })
    // }

    // console.log(req.userId)
    // console.log("post daily review response is running", req.body)

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

export async function getExistingDailyReview(req, res) {
    const review = await DailyReviewResponse.findById(req.params.id)

    if (!review) {
        return res.status(404).json({ error: "Review not found" })
    }

    res.json(review)
}

export async function updateExistingDailyReview(req, res) {
    const review = await DailyReviewResponse.findByIdAndUpdate(
        req.params.id,
        { responses: req.body.responses },
        { new: true }
    )

    res.json(review)
}