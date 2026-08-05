import mongoose from "mongoose"

const completedExerciseSchema = new mongoose.Schema(
    {
        exerciseName: {
            type: String,
            required: true,
        },

        targetAmount: {
            type: Number,
            required: true,
        },

        completedAmount: {
            type: Number,
            required: true,
            default: 0,
        },

        completedSets: [{
            type: Number,
        }],

        progressionRate: {
            type: Number,
            required: true,
        },

        unitType: {
            type: String,
            enum: ["reps", "seconds"],
            required: true,
        },

        completed: {
            type: Boolean,
            default: false,
        }
    },
    { _id: false }
)

const dailyChallengeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        challengeDate: {
            type: Date,
            required: true,
            index: true,
        },

        level: {
            type: Number,
            required: true,
        },

        challengeMode: {
            type: String,
            required: true,
        },

        exercises: [completedExerciseSchema],

        completed: {
            type: Boolean,
            default: false,
        },

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)

dailyChallengeSchema.index(
    {
        userId: 1,
        challengeDate: 1,
    },
    {
        unique: true,
    }
)

export default mongoose.model("fit_dailyChallenges", dailyChallengeSchema)