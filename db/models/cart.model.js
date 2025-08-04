import mongoose, { model, Schema } from "mongoose"


const CartSchema = new Schema({
    name: String, // abdelrahman's cart
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    image_url: {
        type: String,
        default: ""
    },
    id: Number,
    total_price: Number
}, {
    timestamps: true,
    versionKey: false
})

export const CartModel = mongoose.models.User || model("Cart", CartSchema);