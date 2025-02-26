import express from 'express'
import { getAllCart,getAllCartById,createCart,updateCart,deleteCart } from '../controller/Cartcontroller.js'
const RouterCart=express.Router()

RouterCart.get('/',getAllCart)
RouterCart.get('/find/:id',getAllCartById)
RouterCart.post('/create',createCart)
RouterCart.put('/update/:id',updateCart)
RouterCart.delete('/delete/:id',deleteCart)

export default RouterCart