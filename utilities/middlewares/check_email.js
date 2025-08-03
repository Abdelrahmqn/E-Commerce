import { UserModel } from "../../db/models/user.model.js";


export const check_email = async (req, res, next) => {
    const exist = await UserModel.findOne({email:req.body.email})
         if(exist) return res.json({message:"User Already Registered, Please Login "})
           next() 
}
