import express from 'express'
import { getAllTransaksi, getAllTransaksiById, createTransaksi, updateTransaksi, deleteTransaksi, getFilmsByPembeliId } from '../controller/TransaksiController.js'
const RouterTransaksi=express.Router()

RouterTransaksi.get('/',getAllTransaksi)
RouterTransaksi.get('/find/:id',getAllTransaksiById)
RouterTransaksi.get('/films/:id', getFilmsByPembeliId); 
RouterTransaksi.post('/create',createTransaksi)
RouterTransaksi.put('/update/:id',updateTransaksi)
RouterTransaksi.delete('/delete/:id',deleteTransaksi)

export default RouterTransaksi