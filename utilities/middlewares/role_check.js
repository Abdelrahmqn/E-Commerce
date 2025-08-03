
import { UserModel } from "../../db/models/user.model.js";

export const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("AUTH HEADER:", req.headers.authorization);
    if (!token) return res.status(401).json({ message: "Missing token" });

    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: "Access denied" });
    next();
}