import { dbConnection } from './db/dbConnection.js';
import { userRoutes } from './src/user/user_routes.js'
import express from 'express';

const app = new express()
app.use(express.json())




app.use(userRoutes)

dbConnection
app.listen(3000, () => {
    console.log("hello from 3000 local host");
})