import mongoose from "mongoose";


const Schema = new mongoose.Schema({

    name: {
        type: String,
    required: true,
    },

    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },

    role: {
        type: String,
        enum: ["USER", "ADMIN"],
        default: "USER"
    },
    refreshToken: String

}, { timestamps: true })

const model = mongoose.models.User || mongoose.model('User', Schema)
export default model