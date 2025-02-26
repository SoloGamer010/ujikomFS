import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import db from './utils/connection.js';
import RouterAdmin from './router/AdminRouter.js';
import RouterPembeli from './router/PembeliRouter.js';
import RouterFilm from './router/RouterFilm.js';
import RouterCart from './router/CartRouter.js';
import RouterTransaksi from './router/TransaksiRouter.js';
const app = express()
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
})) 

app.use(express.json()) 

app.use('/admin',RouterAdmin)
app.use('/pembeli',RouterPembeli)
app.use('/film',RouterFilm)
app.use('/cart',RouterCart)
app.use('/transaksi',RouterTransaksi)


db.authenticate()
.then(()=>{
    console.log('Database berjalan dengan baik')
})
.catch=(err)=>{
    console.log(err)
}



app.listen(port,()=>{
    console.log(`App berjalan di : http://localhost:${port}`)
})