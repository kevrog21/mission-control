import fitnessUserProfileSchema from "./FitnessUserProfiles.model.js"
import dailyChallengeSchema from "./DailyChallenge.model.js"


export async function postDailyChallenge(req, res) {
    try {
        
        const {
            challengeDate,
            level,
            challengeMode,
            exercises,
            notes,
        } = req.body

        const profile = await fitnessUserProfileSchema.findOne({ userId: req.userId, })

        if (!profile) {
            return res.status(404).json({message: "Fitness profile not found.",})
        }

        const challenge = await dailyChallengeSchema.create({
            userId: req.userId,
            challengeDate,
            level,
            challengeMode,
            exercises,
            notes,
            completedAt: new Date(),
        })

        return res.status(201).json({
            message: "Challenge saved successfully.",
            challenge,
        })


    } catch (err) {
        console.error(err)

        if (err.code === 11000) {
            return res.status(409).json({
                message: "Today's challenge has already been saved."
            })
        }

        res.status(500).json({ message: "Failed to save daily challenge",})
    }
}
