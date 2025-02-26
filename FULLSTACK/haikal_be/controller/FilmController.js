import Film from "../models/FilmModels.js"
import { Op } from "sequelize";
// import { hashData, compareData } from "../utils/bycrptData.js"

export const getAllFilm = async (req, res) => {
    try {
        const data = await Film.findAll()
        res.status(200).json({ msg: 'mengambil seluruh data', data: data })
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}

export const getAllFilmById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Film.findByPk(id)
        if (data) {
            res.status(200).json({ msg: 'berhasil mengambil data ', data: data })
        } else {
            res.status(200).json({ msg: 'data tidak ada', data: null })
        }
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}

export const createFilm = async (req, res) => {
    try {
        const { id, title, price, description, trailer_link, img, genre, language, actors, producers, duration, rating, release_date } = req.body;

        if (!title || !price || !description || !genre || !duration || !rating || !release_date) {
            return res.status(400).json({ message: "Pastikan mengisi semua data wajib" });
        }

        const newFilm = await Film.create({
            id: id || undefined, 
            title, price, description, trailer_link, img, genre, language, actors, producers, duration, rating, release_date
        });

        res.status(201).json({ message: "Film berhasil dibuat", data: newFilm });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
};

export const updateFilm = async (req, res) => {
    try {
        if (!req.body.title || !req.body.price, !req.body.description || !req.body.img || !req.body.genre || !req.body.language || !req.body.actors || !req.body.producers || !req.body.release_date || !req.body.duration || !req.body.rating) {
            res.status(400).json({ msg: 'pastikan mengisi semua data' })
        } else {
            const { title, price, description,img,genre,language,actors,producers,release_date,duration,rating } = req.body
            const data = await Film.update({ title, price, description,img,genre,language,actors,producers,release_date,duration,rating}, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ message: 'Data berhasil diupdate' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }

}


export const deleteFilm = async (req, res) => {
    try {
        const { id } = req.params;
        await Film.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: 'Data berhasil di hapus' })

    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus data.', error });
    }
}

export const getRekomendasiFilm = async (req, res) => {
    try {
        const rekomendasi = await Film.findAll({
            where: { id: [1, 3, 8] }  
        });
        res.json({ success: true, data: rekomendasi });
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengambil film rekomendasi" });
    }
};

export const getFilmLainnya = async (req, res) => {
    try {
        const rekomendasi = await Film.findAll({
            // where: { id: [4, 8, 9] }  
        });
        res.json({ success: true, data: rekomendasi });
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengambil film rekomendasi" });
    }
};

export const searchFilm = async (req, res) => {
    try {
        const { query } = req.query; 
        if (!query) {
            return res.status(400).json({ success: false, message: "Query tidak boleh kosong" });
        }

        const results = await Film.findAll({
            where: {
                title: { [Op.like]: `%${query}%` } 
            }
        });

        res.json({ success: true, data: results });
    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mencari film", error: error.message });
    }
};