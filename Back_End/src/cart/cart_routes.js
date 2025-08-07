import express from 'express';
// import { register, login, AllUsers, deleteUser, updateUser, verifyAccount } from "./user_controller.js"
import { isAdmin, isAuth, check_email } from '../../utilities/middlewares/role_check.js';
import { NewCart } from './cart_controller.js'
export const CartRouter = express.Router();
CartRouter.use(express.json());

CartRouter.post('/cart/:id', NewCart)