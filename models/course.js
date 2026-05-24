import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    img: { type: String },
    support: { type: String },
    shortName: { type: String, required: true },
    price: { type: Number, required: true },
    href:{ type: String, required: true },

    isComplete: { type: Boolean, required: true },
    status: { type: String, required: true },
    discount: { type: Number, required: true },
    startTime: { type: String },

    ScheduledTime: { type: String, required: true },
    EventFormat: { type: String, required: true },
    level: { type: String, required: true },
    courseType: { type: String, required: true },
    courseDuration: { type: String, required: true },
    prerequisite: { type: String, required: true },
    NumberOfSessions: { type: String, required: true },
    ClassDuration: { type: String, required: true },
    totalHours: { type: String, required: true },
    recordedCourse: { type: Boolean, required: true },
    certificate: { type: Boolean, required: true },
    language: { type: String, required: true },

    categoryID: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    comments: [{ type: mongoose.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export default mongoose.models.Course || mongoose.model("Course", courseSchema);

