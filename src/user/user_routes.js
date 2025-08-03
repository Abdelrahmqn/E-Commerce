import express from 'express';
import { register, login, AllUsers, deleteUser, updateUser } from "./user_controller.js"
import { check_email } from '../../utilities/middlewares/check_email.js';

export const userRoutes = express.Router();
userRoutes.use(express.json());

userRoutes.get('/users', AllUsers)
userRoutes.post('/register', check_email, register)
userRoutes.post('/login', login)
userRoutes.put('/update/:id', updateUser)
userRoutes.delete('/delete/:id', deleteUser)
