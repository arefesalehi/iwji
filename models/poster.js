import mongoose from "mongoose";

const Schema = new mongoose.Schema(
    {
    title: { type: String, required: true },           

    posterImg_xl: { type: String, required: false }, 
    posterImg_sm: { type: String, required: false },
    posterImg_md: { type: String , required: false},
    posterImg_lg: { type: String , required: false},      

    
    },
    { timestamps: true }
);


const model = mongoose.models.Poster || mongoose.model("Poster", Schema);
export default model
