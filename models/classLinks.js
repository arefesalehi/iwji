
import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "لینک کلاس",
    },
    url: {
      type: String,
      required: true,
    },
    courseId: { type: mongoose.Types.ObjectId, ref: 'Course', required: true },
    users: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        username: { type: String },
        password: { type: String },
      },
    ],
  },
  { timestamps: true }
);


const model = mongoose.models.ClassLink || mongoose.model("ClassLink", linkSchema);
export default model;
