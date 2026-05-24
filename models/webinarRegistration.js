import mongoose from "mongoose";

const webinarSchema = new mongoose.Schema(
    {
        webinarName: {
            type: String,
            required: true,
            trim: true,
        },
        link: {
            type: String,
            required: true,
            trim: true,
        },

        date: {
            type: Date,
            required: true,
        },

        hour: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            default: 0,
        },
        img: {
            type: String,
            required: false
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

    },
    { timestamps: true }
);


const WebinarRegistration =
    mongoose.models.WebinarRegistration ||
    mongoose.model("WebinarRegistration", webinarSchema);

export default WebinarRegistration;
