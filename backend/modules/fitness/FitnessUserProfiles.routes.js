import express from "express"

import { getUserFitnessProfileSettings, postDailyROutineExercises} from "./FitnessUserProfiles.controller.js"
import { protect } from "../../middleware/protect.js"

const router = express.Router()

router.get("/userFitnessProfileSettings", protect, getUserFitnessProfileSettings)
router.post("/dailyRoutineExercises", protect, postDailyROutineExercises)


export default router