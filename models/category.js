import mongoose from "mongoose";

const  Schema =  mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const model = mongoose.models.Category || mongoose.model('Category' , Schema);

export default model
