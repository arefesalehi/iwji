import mongoose from "mongoose";
import userModel from '@/models/user'
const Schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    articlebody: { type: String, required: true },
    img: { type: String, required: false },
    shortName: { type: String, required: true, unique: true },
    categoryID: { 
      type: mongoose.Types.ObjectId, 
      ref: "Category", 
      required: true 
    },
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: false },
    publish: { type: Boolean, default: false },
    folderName: { type: String, required: false }
  },
  { timestamps: true }
);

const model = mongoose.models.Article || mongoose.model("Article", Schema);
export default model;