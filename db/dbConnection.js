import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

export const dbConnection = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB Atlas"))
.catch(err => console.error("Connection error:", err));
