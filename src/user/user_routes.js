import express from 'express';
import { register, login } from "./user_controller.js"

export const userRoutes = express.Router();
userRoutes.use(express.json());

userRoutes.post('/register', register)
userRoutes.post('/login', login)
// userRoutes.use('/user/profile', )
// userRoutes.use('/user/update')
// userRoutes.use('/user/deleteProfile')
