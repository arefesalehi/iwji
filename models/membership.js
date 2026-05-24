import mongoose from "mongoose";

const  Schema =  mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    membershipImg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);


const model = mongoose.models.Membership || mongoose.model('Membership' , Schema);

export default model
