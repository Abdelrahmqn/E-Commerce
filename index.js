import { CartModel } from './db/models/cart.model.js';
import { ProductModel } from './db/models/product.model.js';
import { UserModel } from './db/models/user.model.js';

const express = require('express')

const app = new express()



app.listen(3000, () => {
    console.log("hello from 3000 local host");
})