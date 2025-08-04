import { UserModel } from "../../db/models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export let isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("Authorization header:", authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await UserModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!user.isConfirmed) {
      return res.status(403).json({ message: 'Please confirm your email before accessing this resource' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error); // Add this
    res.status(401).json({ error: error.message });
  }
};


export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const check_email = async (req, res, next) => {
    const exist = await UserModel.findOne({email:req.body.email})
         if(exist) return res.json({message:"User Already Registered, Please Login "})
           next() 
}