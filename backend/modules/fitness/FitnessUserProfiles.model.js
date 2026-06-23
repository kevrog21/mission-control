import mongoose from "mongoose"

const routineExerciseSchema = new mongoose.Schema(
  {
    exerciseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExerciseIndex",
      required: true,
    },

    startingAmount: {
      type: Number,
      required: true,
    },

    progressionRate: {
      type: Number,
      default: 0.5,
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

     lastWorkoutCompletedAt: {
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