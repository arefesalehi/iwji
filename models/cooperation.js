import mongoose from "mongoose";
const Schema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }

})
const model = mongoose.models.Cooperation || mongoose.model('Cooperation', Schema)
export default model