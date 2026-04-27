import express from "express"
import { getUserDailyReviewQuestions, createDailyReviewQuestion, getDailyReviewResponseForDate, postDailyReviewResponse, getExistingDailyReview, updateExistingDailyReview, getRecentDailyReviews, updateUserDailyReviewQuestions } from "./dailyReview.controller.js"
import { protect } from "../../../middleware/protect.js"

const router = express.Router()

router.get("/userDailyReviewQuestions", protect, getUserDailyReviewQuestions)
router.put("/updateUserDailyReviewQuestions", protect, updateUserDailyReviewQuestions )
router.post("/createDailyReviewQuestion", protect, createDailyReviewQuestion )
router.get("/responses", protect, getDailyReviewResponseForDate)
router.get("/responses/:id", protect, getExistingDailyReview)
router.get("/recent", protect, getRecentDailyReviews)
router.put("/responses/:id", protect, updateExistingDailyReview)
router.post("/newDailyReviewResponse", protect, postDailyReviewResponse)

export default router