import { dbConnection } from './db/dbConnection.js';
import { ProductRouter } from './src/product/product_routes.js';
import { userRoutes } from './src/user/user_routes.js'
import { CartRouter } from './src/cart/cart_routes.js'
import express from 'express';


const app = new express()
app.use(express.json())




app.use(userRoutes)
app.use(ProductRouter)
app.use(CartRouter)
dbConnection

app.listen(4000, () => {
    console.log("hello from 4000 local host");
})