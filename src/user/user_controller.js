import { UserModel } from "../../db/models/user.model.js";
import bcrypt from 'bcrypt'


export let register = async (req, res) => {
    try {
        const exist = await UserModel.findOne({ email: req.body.email });

        if (!exist) {
            const hashedPassword = bcrypt.hashSync(req.body.password, 10);
            req.body.password = hashedPassword;

            const addUser = await UserModel.insertMany([req.body]);
            console.log(hashedPassword);
            

            addUser[0].password = undefined;

            res.status(200).json({ message: `The user ${addUser[0].firstName} just registered!!` });
        } else {
            res.status(400).json({ message: "User already registered" });
        }
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
    res.status(200).json({Message: `Welcome ${foundUser.firstName}`});

}