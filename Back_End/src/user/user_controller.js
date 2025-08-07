import { UserModel } from "../../db/models/user.model.js";
import { sendMail } from "../../utilities/email/sendMail.js"
import bcrypt from 'bcrypt'
import jwt, { decode } from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export let register = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        const addUser = await UserModel.insertMany(req.body);        

        addUser[0].password = undefined;
        sendMail(req.body.email)
        res.status(201).json({ message: `The user ${addUser} just registered!!` });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export let login = async (req, res) => {
  const foundUser = await UserModel.findOne({ email: req.body.email });

  if (!foundUser)
    return res.status(404).json({ message: "Incorrect email or password" });

  if (!foundUser.isConfirmed) {
    return res.status(401).json({ message: "Account is not confirmed" });
  }

  const match = bcrypt.compareSync(req.body.password, foundUser.password);
  if (!match)
    return res.status(409).json({ message: "Incorrect email or password" });

  let token = jwt.sign(
    { _id: foundUser._id, role: foundUser.role },
    process.env.SECRET_TOKEN
  );

  console.log("token from login", token);

  res.status(200).json({
    message: `Welcome ${foundUser.firstName}`,
    token: token // <-- 🔥 THIS is what your frontend/Postman needs
  });
};
    

export let AllUsers = async(req, res) => { //from admin
    try {
        const allusers = await UserModel.find().select("password");
        return res.status(200).json({ message: "All users", users: allusers });
    } catch (error) {
        console.log(error);
        
    }

}

export let deleteUser = async (req, res) => {
    try {
        const deleteUser = await UserModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: `User ${deleteUser.firstName} deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export let updateUser = async (req, res) => {
    try {
        const exist = await UserModel.findOne({_id:req.params.id})
    
    
    if(!exist) 
        return res.json({message:" user with this email doesn't exist"})

        const updatedUser =await UserModel.findByIdAndUpdate( req.params.id , {...req.body},{returnDocument:"after"})
        res.json({message:"updated successfully", updatedUser})
    } catch (err) {
        res.status(404).json({err: err.message})
    }
}



export let verifyAccount = async (req, res) => {
    jwt.verify(req.params.email, process.env.SECRET_TOKEN, async (err, decode) => {
        if (err) return res.status(409).json({message: "Please Confirm your email first "});
        await UserModel.findOneAndUpdate({email: decode.email}, {isConfirmed: true})
        res.json({message: "Account Confirmed successfully!!"})
    })
}
