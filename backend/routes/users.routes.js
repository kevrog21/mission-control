import express from "express"
import { protect } from "../middleware/auth.js"

import { getCurrentUser } from "../controllers/users.controller.js"

const router = express.Router()

router.get("/current-user", protect, getCurrentUser)

export default router