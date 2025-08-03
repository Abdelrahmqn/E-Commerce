// import { UserModel } from "../../db/models/user.model.js";
// import { ProductModel } from "../../db/models/product.model.js";

// import bcrypt from 'bcrypt'
// import dotenv from 'dotenv';
// import jwt from "jsonwebtoken";
// dotenv.config();


// export const createProduct = async (req, res) => {
//     try {
//         const newProduct = await ProductModel.create(req.body);
//         res.status(201).json({ message: "Product created", product: newProduct });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getAllProducts = async (req, res) => {
//     try {
//         const products = await ProductModel.find();
//         res.status(200).json({ products });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.getProductById = async (req, res) => {
//     try {
//         const product = await ProductModel.findById(req.params.id);
//         if (!product) return res.status(404).json({ message: "Product not found" });
//         res.status(200).json({ product });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.updateProduct = async (req, res) => {
//     try {
//         const updatedProduct = await ProductModel.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
//         res.status(200).json({ message: "Product updated", product: updatedProduct });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.deleteProduct = async (req, res) => {
//     try {
//         const deleted = await ProductModel.findByIdAndDelete(req.params.id);
//         if (!deleted) return res.status(404).json({ message: "Product not found" });
//         res.status(200).json({ message: "Product deleted" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };