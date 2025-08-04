import { ProductModel } from "../../db/models/product.model.js"
import { UserModel } from "../../db/models/user.model.js"
import dotenv from 'dotenv';
dotenv.config();

export const getProducts = async (req, res) => {
    const products = await ProductModel.find();
    res.status(200).json(products);
}


// creating a new product just with admin (if the role of the user is admin)
export const createProduct = async (req, res) => {
    const { name, description, price, image_url, quantity, rate } = req.body;
    const userId = req.params.id; // Make sure your route is /add/products/:id

    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });

        const product = await ProductModel.create({
            name,
            description,
            price,
            image_url,
            quantity,
            rate,
            createdBy: user._id
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// assume that you are admin and you need to deleted a product the only way to do that is by ensuring the the user role is admin plus the product id 
// matching with the product that in params (req.params._id === req.body._id)


export const updateProduct = async (req, res) => {
    const { name, description, price, image_url, quantity, rate } = req.body;
    const userId = req.params.id;

    try {
        const user = await UserModel.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found!" });

        if (user.role !== "admin") return res.status(401).json({ message: "Only Admins can add products!" });

        const product = await ProductModel.findOneAndUpdate(
            { _id: req.params._id },
            {
                name,
                description,
                price,
                image_url,
                quantity,
                rate,
                createdBy: user._id
            },
            { new: true }
        );

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await ProductModel.findByIdAndDelete(req.params.id);
        if (!deleteProduct) return res.status(404).json({ message: "Product not found!" });
        res.status(200).json({ message: `Product deleted successfully!` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};