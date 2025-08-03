import { UserModel } from "../../db/models/user.model.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


// export const auth = (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     console.log("AUTH HEADER:", authHeader);

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return res.status(401).json({ message: "Missing token" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//         res.status(200).json({ 
//         message: `Welcome ${foundUser.firstName}`,
//         token // <-- add this
//     });
//         const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
//         req.user = decoded;
//         next();
//     } catch (error) {
//         console.error("JWT Error:", error.message);
//         res.status(401).json({ message: "Invalid token" });
//     }
// };

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