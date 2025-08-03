import { UserModel } from "../../db/models/user.model.js";
import { check_email } from "../../utilities/middlewares/check_email.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

export let register = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        const addUser = await UserModel.insertMany([req.body]);
        console.log(hashedPassword);
        

        addUser[0].password = undefined;

            res.status(200).json({ message: `The user ${addUser[0].firstName} just registered!!` });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export let login = async (req, res) => {
    const foundUser = await UserModel.findOne({email: req.body.email});

    if (!foundUser)
        return res.json({message: "incorrect email or password"})
    
    const match = bcrypt.compareSync(req.body.password, foundUser.password)
    if (!match)
        return res.status(409).json({message: "incorrect email or password"})
    
    let token = jwt.sign({_id: foundUser._id, role: foundUser.role}, process.env.SECRET_TOKEN)
    console.log(token)
    res.status(200).json({Message: `Welcome ${foundUser.firstName}`});
    
}

export let AllUsers = async(req, res) => {
    const allusers = await UserModel.find();
    const userRole = await UserModel.find({role: req.body.role});
    
    if (userRole === 'admin') return res.status(200).json({message: `All users from admin`}, allusers)    
    return res.status(409).json({message: "only admin can see users"})
}

export let deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const deleteUser = await UserModel.findByIdAndDelete(
        userId,
        updateData,
        { new: true, runValidators: true }
        );

        if (!deleteUser) return res.status(404).json({message: "User not found"})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export let updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
        );

        if (!updateUser) return res.status(404).json({message: "User not found"})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}