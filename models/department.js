import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);


const model = mongoose.models.Department || mongoose.model("Department", Schema);

export default model
