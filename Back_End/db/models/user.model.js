import mongoose, { model, Schema } from "mongoose"


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    age: Number,
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    },
    isConfirmed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
    versionKey: false
})

export const UserModel = mongoose.models.User || model("User", userSchema);
