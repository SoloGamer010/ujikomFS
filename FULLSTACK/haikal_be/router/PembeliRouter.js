import express from 'express'
import {  deletePembeli, getAllPembeli, getAllPembeliById, loginPembeli, registerPembeli, updatePembeli } from '../controller/PembeliController.js'
const RouterPembeli=express.Router()

RouterPembeli.get('/',getAllPembeli)
RouterPembeli.get('/find/:id',getAllPembeliById)
RouterPembeli.post('/login',loginPembeli)
RouterPembeli.post('/register',registerPembeli)
RouterPembeli.put('/update/:id',updatePembeli)
RouterPembeli.delete('/delete/:id',deletePembeli)

export default RouterPembeli