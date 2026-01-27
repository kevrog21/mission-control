import express from "express"
import { getUserDailyReviewQuestions } from "../controllers/dailyReviewQuestionsController.js"
import { postDailyReviewResponse } from "../controllers/dailyReviewResponsesController.js"
import { protect } from "../middleware/auth.js"

const router = express.Router()

router.get("/userDailyReviewQuestions", protect, getUserDailyReviewQuestions)
router.post("/userDailyReviewQuestions", protect, postDailyReviewResponse)

export default router