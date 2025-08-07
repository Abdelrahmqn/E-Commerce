import { dbConnection } from './db/dbConnection.js';
import { ProductRouter } from './src/product/product_routes.js';
import { userRoutes } from './src/user/user_routes.js'
import { CartRouter } from './src/cart/cart_routes.js'
import express from 'express';
import cors from 'cors';

const app = new express()
app.use(express.json())

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}))

// app.use(cors())

app.use(userRoutes)
app.use(ProductRouter)
app.use(CartRouter)


dbConnection

app.listen(4000, () => {
    console.log("hello from 4000 local host");
})