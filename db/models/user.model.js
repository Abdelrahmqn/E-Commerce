import mongoose, { model, Schema } from "mongoose"


const userSchema = new Schema({
    firstName: String,
    lastName: String,
    password: String,
    age: Number,
    email: String
}, {
    timestamps: true,
    versionKey: false
})

export const UserModel = model("User", userSchema);
