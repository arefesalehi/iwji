import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  phone: { type: String, required: true },
  code: { type: String, required: true },
  expTime: { type: Date, required: true },
  name: { type: String },
  email: { type: String }, 
});

const model = mongoose.models.Otp || mongoose.model("Otp", Schema);
export default model;
