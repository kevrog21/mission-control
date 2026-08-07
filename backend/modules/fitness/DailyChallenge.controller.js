import fitnessUserProfileSchema from "./FitnessUserProfiles.model.js"
import dailyChallengeSchema from "./DailyChallenge.model.js"

function getDayDifference(date1, date2) {
    const msPerDay = 1000 * 60 * 60 * 24

    const start1 = new Date(date1)
    const start2 = new Date(date2)

    start1.setHours(0, 0, 0, 0)
    start2.setHours(0, 0, 0, 0)

    return Math.floor((start1 - start2) / msPerDay);
}

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

        const today = new Date();

        if (!profile.lastChallengeCompletedAt) {
            profile.currentStreak = 1
        }
        else {

            const difference = getDayDifference(
                today,
                profile.lastChallengeCompletedAt
            )

            if (difference === 1) {
                profile.currentStreak += 1
            }
            else if (difference > 1) {
                profile.currentStreak = 1
            }
        }

        const challenge = await dailyChallengeSchema.create({
            userId: req.userId,
            challengeDate,
            level,
            challengeMode,
            exercises,
            notes,
            completedAt: today,
        })

        profile.currentLevel += 1

        profile.highestLevelAchieved = Math.max(
            profile.highestLevelAchieved, profile.currentLevel
        )

        profile.lastChallengeCompletedAt = today

        profile.longestStreak = Math.max(
            profile.longestStreak,
            profile.currentStreak
        )

        profile.totalChallengesCompleted++

        await profile.save()


        return res.status(201).json({
            message: "Challenge saved successfully.",
            challenge,
            profile,
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
