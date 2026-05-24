const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
    {
        title: {
            type: String,
            ref: "Course",
        },
        parent: {
            type: mongoose.Types.ObjectId,    //  ????
            ref: "User",
        },
        department: {
            type: mongoose.Types.ObjectId,
            ref: 'Department',
            required: true
        }
    },
    { timestamps: true }
);

const model = mongoose.models.SubDepartment || mongoose.model('SubDepartment', Schema);

export default model
