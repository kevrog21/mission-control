import mongoose from "mongoose"

const dailyReviewQuestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    key: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["boolean", "number", "text"],
      required: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

/* Prevents duplicate keys per user */
dailyReviewQuestionSchema.index(
  { userId: 1, key: 1 },
  { unique: true }
)

export default mongoose.model("DailyReviewQuestion", dailyReviewQuestionSchema)