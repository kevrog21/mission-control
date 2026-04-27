import express from "express"
import { registerUser, loginUser } from "../../modules/auth/auth.controller.js"
import { protect } from "../../middleware/protect.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
// router.get("/forgot-password", forgotPassword)


export default router