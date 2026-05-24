const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [ 'certificates', 'practical', 'other'],
   
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  imageFile:{
     type: String,
    required: true,
  }
});

const model = mongoose.models.Gallery || mongoose.model('Gallery', Schema)
export default model
