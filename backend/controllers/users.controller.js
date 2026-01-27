import User from "../models/Users.model.js"

export const getCurrentUser = async (req, res) => {
    const user = await User.findById(req.userId).select("-password")

    if (!user) {
    return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
}