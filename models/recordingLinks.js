import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Types.ObjectId, ref: 'Course', required: true },
    part:{ type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

const model = mongoose.models.RecordingLink || mongoose.model("RecordingLink", recordingSchema);
export default model;
