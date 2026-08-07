import fitnessUserProfileSchema from "./FitnessUserProfiles.model.js"

export async function getUserFitnessProfileSettings(req, res) {
    try {
        
        const profile = await fitnessUserProfileSchema.findOne({
            userId: req.userId,
      })

        if (!profile) {
            return res.status(404).json({message: "Fitness profile not found.",})
        }

        res.json(profile)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Failed to retrieve profile",})
    }
}

export async function postDailyRoutineExercises(req, res) {

    try {
        const { exercises, mode } = req.body

        const profile = await fitnessUserProfileSchema.findOne({
            userId: req.userId,
        })

        if (!profile) {
            return res.status(404).json({message: "Fitness profile not found.",})
        }

        profile.currentDailyRoutine = exercises
        profile.challengeMode = mode

        await profile.save()

        return res.status(200).json({
            message: "Routine updated successfully",
            profile,
        })

        } catch (err) {
            console.error(err)
            return res.status(500).json({
                message: "Failed to update exercise routine",
            })
    }

}

export async function postNewTimezone(req, res) {
    try {
        const { timezone } = req.body

        if (!timezone) {
            return res.status(400).json({
                message: "Timezone is required.",
            })
        }

        const profile = await fitnessUserProfileSchema.findOne({
            userId: req.userId,
        })

        if (!profile) {
            return res.status(404).json({
                message: "Fitness profile not found.",
            })
        }

        profile.timezone = timezone

        await profile.save()

        return res.status(200).json({
            message: "Timezone updated successfully.",
            profile,
        })

    } catch (err) {
        console.error(err)

        return res.status(500).json({
            message: "Failed to update timezone.",
        })
    }
}