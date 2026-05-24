import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },

     img: {
        type: String,
        required: false
    },

    shortDesc: {
        type: String,
        required: true
    },
    longDesc: {
        type: String,
        required: true
    },


}, { timestamps: true })

const model = mongoose.models.OurTeam || mongoose.model('OurTeam', Schema)
export default model