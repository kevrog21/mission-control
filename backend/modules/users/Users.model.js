import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String, 
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true
        },

        isVerified: {
            type: Boolean,
            default: false
        },

        emailVerificationToken: {
            type: String,
        },

        emailVerificationExpires: {
            type: Date,
        },

        accountIsActive: {
            type: Boolean,
            default: true
        }
    }, {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

export default User