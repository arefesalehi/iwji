import mongoose from "mongoose";
import courseRegisterationModel from '@/models/courseRegisteration'

const moduleScoreSchema = new mongoose.Schema({
  module: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4]
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  }
}, { _id: false });

const scoreSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    ref: "CourseRegistration",
    required: true
  },
  course: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true
  },
  part: {
    type: Number,
    required: true,
    enum: [1, 2,3]
  },
  examDate: {
    type: Date,
    default: Date.now
  },
  scores: [moduleScoreSchema]
}, { timestamps: true });

// برای جلوگیری از استفاده از مدل قدیمی
if (mongoose.models.Score) {
  delete mongoose.models.Score;
}

const model = mongoose.model("Score", scoreSchema);
export default model;
