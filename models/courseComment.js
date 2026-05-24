import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema({
    
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    course: {
        type: mongoose.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    isAnswer: {
      type: Boolean,
      default:false
    },

    date: {
      type: Date,
      default: () => Date.now(),
      immutable: false
    },
    isAccept: {
      type: Boolean,
      default: false,
    },

}, { timestamps: true })

const model = mongoose.models.CourseComment || mongoose.model('CourseComment', Schema)
export default model