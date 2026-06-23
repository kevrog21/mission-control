import mongoose from "mongoose"

const userSettingsSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },

        apps: {
            missionControl: {
                enabled: {
                    type: Boolean,
                    default: false,
                },

                connectedAt: {
                    type: Date,
                    default: null,
                },
            },

            fitness: {
                enabled: {
                    type: Boolean,
                    default: false,
                },

                connectedAt: {
                    type: Date,
                    default: null,
                },
            },

            recipe: {
                enabled: {
                    type: Boolean,
                    default: false,
                },

                connectedAt: {
                    type: Date,
                    default: null,
                },
            },
            },

        preferences: {
            theme: {
                type: String,
                enum: ["light", "dark", "system"],
                default: "system",
            },

            timezone: {
                type: String,
                default: "UTC",
            },

            startOfWeek: {
                type: String,
                enum: ["sunday", "monday"],
                default: "monday",
            },
        },
    },
    { timestamps: true }
)

const UserSettings = mongoose.model('All_UserSetting', userSettingsSchema)

export default UserSettings