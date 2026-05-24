// import mongoose from "mongoose";

// const accountSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true }, // مثال: "لینک کلاس زوم"
//     url: { type: String, required: true },
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//   },
//   { _id: false }
// );

// const recSchema = new mongoose.Schema(
//   {
//     title: { type: String, required: true },
//     url: { type: String, required: true },
//     part: { type: String, required: true, default: 'نامشخص' },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { _id: false }
// );





// const courseRegistrationSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, index: true },
//     courseId: { type: mongoose.Types.ObjectId, ref: "Course", required: true, index: true },

//     // اطلاعات هویتی/آدرسی
//     birthCertificateNumber: { type: String, required: true },
//     nationalId: { type: String, required: true },
//     birthPlace: { type: String, required: true },
//     birthDate: { type: String, required: true },
//     homeAddress: { type: String, required: true },
//     homePostalCode: { type: String, required: true },
//     workAddress: { type: String, required: true },
//     workPostalCode: { type: String, required: true },
//     phoneNumber: { type: String, required: true },

//     // حساب‌های کلاس و ضبط‌ها (برای همین دوره)
//     classAccounts: [accountSchema],
//     recordings: [recSchema],

//     // فایل‌ها
//     personalPhoto: { type: String, required: true },
//     birthCertificateImage: { type: String, required: true },
//     passportImage: { type: String, required: true },


//     description: { type: String },


//     courseCalendar: [
//       {
//         title: { type: String },
//         fileUrl: { type: String },
//         uploadedAt: { type: Date, default: Date.now },
//       }
//     ],
//   },
//   { timestamps: true }
// );

// // هر کاربر برای هر دوره فقط یک ثبت‌نام
// courseRegistrationSchema.index({ userId: 1, courseId: 1 }, { unique: true });

// export default mongoose.models.CourseRegistration ||
//   mongoose.model("CourseRegistration", courseRegistrationSchema);



import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // مثال: "لینک کلاس زوم"
    url: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { _id: false }
);

const recSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    part: { type: String, required: true, default: "نامشخص" },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const receiptSchema = new mongoose.Schema(
  {
    fileUrl: { type: String },
    fileName: { type: String },
    uploadedAt: { type: Date },
  },
  { _id: false }
);

const courseRegistrationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, index: true },
    courseId: { type: mongoose.Types.ObjectId, ref: "Course", required: true, index: true },

    // اطلاعات هویتی/آدرسی
    birthCertificateNumber: { type: String },
    nationalId: { type: String },
    birthPlace: { type: String },
    birthDate: { type: String },
    homeAddress: { type: String },
    homePostalCode: { type: String },
    workAddress: { type: String },
    workPostalCode: { type: String },
    phoneNumber: { type: String },

    // حساب‌های کلاس و ضبط‌ها
    classAccounts: [accountSchema],
    recordings: [recSchema],

    // فایل‌ها
    personalPhoto: { type: String },
    birthCertificateImage: { type: String },
    passportImage: { type: String },

    description: { type: String },

    // رسیدها (چهار بخش مجزا)
    receipts: {
      receipt1: receiptSchema,
      receipt2: receiptSchema,
      receipt3: receiptSchema,
      receipt4: receiptSchema,
    },

    courseCalendar: [
      {
        title: { type: String },
        fileUrl: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// هر کاربر برای هر دوره فقط یک ثبت‌نام
courseRegistrationSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export default mongoose.models.CourseRegistration ||
  mongoose.model("CourseRegistration", courseRegistrationSchema);
