import express from 'express';
import { register, login, AllUsers, deleteUser, updateUser } from "./user_controller.js"
import { check_email } from '../../utilities/middlewares/check_email.js';
import { auth, isAdmin } from '../../utilities/middlewares/role_check.js';

export const userRoutes = express.Router();
userRoutes.use(express.json());

userRoutes.post('/register', check_email, register)
userRoutes.post('/login', login)

userRoutes.get('/users', auth, isAdmin, AllUsers)
userRoutes.put('/update/:id', auth, updateUser)
userRoutes.delete('/delete/:id', auth, deleteUser)
