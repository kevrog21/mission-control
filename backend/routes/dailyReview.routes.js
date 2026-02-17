import express from "express"
import { getUserDailyReviewQuestions, getDailyReviewResponseForDate, postDailyReviewResponse } from "../controllers/dailyReview.controller.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/userDailyReviewQuestions", protect, getUserDailyReviewQuestions)
router.get("/responses", protect, getDailyReviewResponseForDate)
router.post("/newDailyReviewResponse", protect, postDailyReviewResponse)

export default router