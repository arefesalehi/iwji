import mongoose from "mongoose";

const checkoutSchema =  mongoose.Schema(
    {

         // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "USER",
  //   required: true,
  // },

  
  totalPrice: {
    type: Number,
    required: true,
  },

  authority: {
    type: String,
    required: true,
    unique: true,
  },
}

);

const model =
  mongoose.models.Checkout || mongoose.model("Checkout", checkoutSchema);

export default model
