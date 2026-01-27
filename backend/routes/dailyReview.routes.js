import express from "express"
import { getUserDailyReviewQuestions, postDailyReviewResponse } from "../controllers/dailyReview.controller.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/userDailyReviewQuestions", protect, getUserDailyReviewQuestions)
router.post("/userDailyReviewResponse", protect, postDailyReviewResponse)

export default router