import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a Valid username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a Valid email"]
    },
    password:{
        type: String,
        required: [true,"Password is Required"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User