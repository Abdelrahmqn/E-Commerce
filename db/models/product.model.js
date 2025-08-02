import mongoose, { model, Schema } from "mongoose"


const ProductSchema = new Schema({
    name: String,
    id: Number,
    price: Number,
    rate: Number,
    description: String,
    quantity: {
        type: Number,
        require: true,
        default: 0
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    image_url: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
    versionKey: false
})

export const ProductModel = model("User", ProductSchema);
