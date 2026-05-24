import mongoose, { mongo } from "mongoose";

const Schema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
       email:{
        type:String,
        required:true
    },
       phone:{
        type:String,
        required:true
    },
       body:{
        type:String,
        required:true
    },
     answer: {
      type: Boolean,
      required: true,
    },   // 0 or 1  پاسخ داده شده یا نه
    
},{timestamps:true})

const model = mongoose.models.Contact || mongoose.model('Contact', Schema)
export default model