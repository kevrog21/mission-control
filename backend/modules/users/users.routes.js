import express from "express"
import { protect } from "../../middleware/protect.js"

import { getCurrentUser } from "../users/users.controller.js"

const router = express.Router()

router.get("/current-user", protect, getCurrentUser)

export default router