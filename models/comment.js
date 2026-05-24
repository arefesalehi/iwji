import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
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
    
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
    },
    
    mainCommentID: {
      type: mongoose.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);



const model = mongoose.models.Comment || mongoose.model("Comment", Schema);

export default model
