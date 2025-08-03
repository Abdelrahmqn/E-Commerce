import { UserModel } from "../../db/models/user.model.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";
dotenv.config();

export let register = async (req, res) => {
    try {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hashedPassword;

        const addUser = await UserModel.create(req.body);        

        addUser.password = undefined;

        res.status(201).json({ message: `The user ${addUser.firstName} just registered!!` });
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
    console.log(foundUser.id)
    res.status(200).json({Message: `Welcome ${foundUser.firstName}`});
    
}

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
        if (!deleteUser) return res.status(404).json({message: "User not found"});

        res.status(200).json({ message: `User ${deleteUser.firstName} deleted` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export let updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = bcrypt.hashSync(updateData.password, 10);
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
        );

        if (!updateUser) return res.status(404).json({message: "User not found"})
            updatedUser.password = undefined;
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}