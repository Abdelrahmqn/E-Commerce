import { UserModel } from "../../db/models/user.model.js";


export const check_email = async (req, res, next) => {
    try {
        const exist = await UserModel.findOne({ email: req.body.email });
        if (exist) return res.status(400).json({ message: "User already registered" });
        next();
    } catch (error) {
        console.log(error);
        
    }
}
