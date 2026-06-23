import express from "express"

import { getUserFitnessProfileSettings} from "./FitnessUserProfiles.controller.js"
import { protect } from "../../middleware/protect.js"

const router = express.Router()

router.get("/userFitnessProfileSettings", protect, getUserFitnessProfileSettings)

export default router