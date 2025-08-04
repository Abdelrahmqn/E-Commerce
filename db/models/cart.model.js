import mongoose, { model, Schema } from "mongoose"


const CartSchema = new Schema({
    items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      }
    }
  ],
    OwnedBy: {
        type: mongoose.Types.ObjectId,
        ref:"User",
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
})

export const CartModel = mongoose.models.User || model("Cart", CartSchema);