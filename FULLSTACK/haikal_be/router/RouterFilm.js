import express from 'express'
import { createFilm, deleteFilm, getAllFilm, getAllFilmById, updateFilm, getRekomendasiFilm, getFilmLainnya, searchFilm   } from '../controller/FilmController.js'
const RouterFilm=express.Router()

RouterFilm.get('/',getAllFilm)
RouterFilm.get('/find/:id',getAllFilmById)
RouterFilm.get('/search', searchFilm)
RouterFilm.post('/create',createFilm)
RouterFilm.put('/update/:id',updateFilm)
RouterFilm.delete('/delete/:id',deleteFilm)
RouterFilm.get("/populer", getRekomendasiFilm)
RouterFilm.get("/lainnya", getFilmLainnya)


export default RouterFilm