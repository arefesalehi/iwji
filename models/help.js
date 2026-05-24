import mongoose from "mongoose";

const  Schema =  mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const model = mongoose.models.Help || mongoose.model('Help' , Schema);

export default model
