import express from "express"

import { postDailyChallenge } from "./DailyChallenge.controller.js"
import { protect } from "../../middleware/protect.js"

const router = express.Router()

router.post("/postDailyChallenge", protect, postDailyChallenge)

export default router