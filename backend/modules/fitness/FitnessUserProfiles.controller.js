import fitnessUserProfileSchema from "./FitnessUserProfiles.model.js"

export async function getUserFitnessProfileSettings(req, res) {
    try {
        
        const profile = await fitnessUserProfileSchema.findOne({
        userId: req.userId,
      })
        console.log("userID:", req.userId )
        console.log("profile", profile )

        if (!profile) {
            return res.status(404).json({message: "Fitness profile not found.",})
        }

        res.json(profile)
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Failed to retrieve profile",})
    }
}