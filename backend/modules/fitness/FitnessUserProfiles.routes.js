import express from "express"

import { getUserFitnessProfileSettings, postDailyRoutineExercises, postNewTimezone} from "./FitnessUserProfiles.controller.js"
import { protect } from "../../middleware/protect.js"

const router = express.Router()

router.get("/userFitnessProfileSettings", protect, getUserFitnessProfileSettings)
router.post("/dailyRoutineExercises", protect, postDailyRoutineExercises)
router.post("/updateTimezone", protect, postNewTimezone)



export default router