// import DailyReviewQuestion from "../models/DailyReviewQuestions.model.js"

// export async function getUserDailyReviewQuestions(req, res) {
//     try {
//         const questions = await DailyReviewQuestion.find({
//             userId: req.userId,
//             active: true,
//         }).sort({ order: 1 })
        
//         res.json(questions)
//     } catch (err) {
//         res.status(500).json({ message: "Failed to fetch questions" })
//     }
// }