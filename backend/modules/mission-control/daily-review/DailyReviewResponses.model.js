import mongoose from "mongoose"

const dailyReviewResponsesSchema = new mongoose.Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
        },

        date: {
        type: Date,
        required: true,
        },

        responses: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        required: true,
        },

        completedAt: {
        type: Date,
        default: Date.now,
        },
    },
    { timestamps: true }
)

dailyReviewResponsesSchema.index(
  { userId: 1, date: 1 },
  { unique: true }
)

dailyReviewResponsesSchema.index(
  { userId: 1, completedAt: -1 }
)

export default mongoose.model("DailyReviewResponse", dailyReviewResponsesSchema)