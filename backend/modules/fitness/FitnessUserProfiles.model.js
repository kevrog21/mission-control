import mongoose from "mongoose"

const routineExerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
    },

    // exerciseId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "ExerciseIndex",
    //   required: true,
    // },

    progressionRate: {
      type: Number,
      default: 1,
      required: true,
    },

    unitType: {
      type: String,
      enum: ["reps", "seconds"],
      required: true,
    },
  },
  { _id: false }
)

const fitnessUserProfileSchema = new mongoose.Schema(
  {
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
        },

    displayName: {
      type: String,
      default: "",
      trim: true,
    },

    currentLevel: {
      type: Number,
      default: 1,
      min: 1,
    },

    highestLevelAchieved: {
      type: Number,
      default: 1,
      min: 1,
    },

     lastChallengeCompletedAt: {
      type: Date,
      default: null,
    },

    currentStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalChallengesCompleted: {
        type: Number,
        default: 0,
    },

    challengeMode: {
      type: String,
      default: "",
    },

    currentDailyRoutine: [routineExerciseSchema],

    onboarding: {
      fitnessIntroComplete: {
        type: Boolean,
        default: false,
      },
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    timezone: {
      type: String,
      default: "UTC",
    },

     profileVisibility: {
      type: String,
      enum: ["public", "friendsOnly", "private"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model("fit_FitnessUserProfile", fitnessUserProfileSchema )