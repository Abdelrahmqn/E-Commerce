import { ProductModel } from "../../db/models/product.model.js"
import { UserModel } from "../../db/models/user.model.js"
import { CartModel } from "../../db/models/cart.model.js"
import dotenv from 'dotenv';
dotenv.config();


export const NewCart = async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        const { quantity } = req.body;
        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Invalid quantity" });
        }

        const user = await UserModel.findById(req.user._id);
        if (!user) {
            return res.status(401).json({ message: "User not found or unauthorized" });
        }

        // Optional: Check if user already has a cart
        let cart = await CartModel.findOne({ user: user._id });

        if (!cart) {
            // Create new cart if not found
            cart = await CartModel.create({
                user: user._id,
                items: [{ product: product._id, quantity }]
            });
        } else {
            // Check if product is already in cart
            const existingItem = cart.items.find(item => item.product.toString() === product._id.toString());
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: product._id, quantity });
            }
            await cart.save();
        }

        return res.status(201).json({ message: "Product added to cart", cart });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
