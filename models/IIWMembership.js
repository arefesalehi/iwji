import mongoose from "mongoose";

const IIWMembershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
     courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",   // ربط دادن به مدل Course
      required: false,  // اگه می‌خوای همیشه به یک دوره وصل باشه
      index: true
    },
 
    code: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const IIWMembership = mongoose.models.IIWMembership || mongoose.model('IIWMembership', IIWMembershipSchema);

export default IIWMembership;
