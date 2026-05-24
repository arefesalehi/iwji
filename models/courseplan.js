import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    courseId: {
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