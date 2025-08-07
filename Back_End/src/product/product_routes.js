import { createProduct, getProducts, updateProduct, deleteProduct } from './product_controller.js';
import express from 'express';
// import { isAdmin } from '../../utilities/middlewares/role_checker.js';


export const ProductRouter = express.Router();
ProductRouter.use(express.json());

ProductRouter.post('/add/product/:id', createProduct);

ProductRouter.get('/products', getProducts);

ProductRouter.put('/product/:id', updateProduct);
ProductRouter.delete('/product/delete/:id', deleteProduct);

