import express from 'express';
import { register, login, AllUsers, deleteUser, updateUser, verifyAccount } from "./user_controller.js"
import { isAdmin, isAuth, check_email } from '../../utilities/middlewares/role_check.js';

export const userRoutes = express.Router();
userRoutes.use(express.json());

userRoutes.post('/register', check_email, register)

userRoutes.post('/login', login)


userRoutes.get('/user/verify/:email', verifyAccount)


userRoutes.post('/users', isAdmin, AllUsers)


userRoutes.put('/update/:id',isAuth, updateUser)
userRoutes.delete('/delete/:id', isAuth, deleteUser)
