import { where } from "sequelize"
import Transaksi from "../models/TransaksiModels.js"
import Cart from "../models/CartModels.js"
import Pembeli from "../models/PembeliModels.js"
import Film from "../models/FilmModels.js"
const includeCart = () => {
    return {
        include: [
            {
                model: Cart,
                as: 'Cart',
                required: true,
                include :[
                    {
                        model : Pembeli,
                        as :'Pembeli'
                    },
                    {
                        model : Film,
                        as : 'Film'
                    }
                ]
            },
        ]
    }
}
export const getAllTransaksi = async (req, res) => {
    try {
        const data = await Transaksi.findAll(includeCart())
        res.status(200).json({ msg: 'mengambil seluruh data', data: data })
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}

export const getAllTransaksiById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Transaksi.findByPk(id, includeCart())
        if(data){
            res.status(200).json({ msg: 'berhasil mengambil data admin', data: data })
        }else{
            res.status(200).json({ msg: 'data tidak ada', data: null })
        }
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }
    
}

export const createTransaksi = async (req, res) => {
    try {
        const {  transaction_date, total_price,payment_status, CartId,payment_method } = req.body;
        
        if (! transaction_date || !total_price || !payment_status || !CartId || !payment_method) {
            return res.status(400).json({ message: 'Semua field harus diisi' });
        }

        const newCart = await Transaksi.create({  transaction_date, total_price,payment_status, CartId,payment_method });
        res.status(201).json({ message: 'Cart berhasil ditambahkan', data: newCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }

}
export const updateTransaksi = async (req, res) => {
    try {
        const { transaction_date, total_price,payment_status, CartId,payment_method } = req.body
        const data = await Transaksi.update({ transaction_date, total_price,payment_status, CartId,payment_method }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ message: 'data berhasil di update' });
    } catch (err) {
        res.status(500).json({ message: 'Terjadi kesalahan', error: err.message });
    }

}

export const deleteTransaksi = async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await Transaksi.findByPk(id);
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart tidak ditemukan' });
        }
        
        await cart.destroy();
        res.status(200).json({ message: 'Cart berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
    }

}

export const getFilmsByPembeliId = async (req, res) => {
    try {
        const pembeliId = req.params.id;
        console.log(`Mencari film untuk pembeli ID: ${pembeliId}`);
        
        const transaksi = await Transaksi.findAll({
            include: [
                {
                    model: Cart,
                    as: 'Cart',
                    required: true,
                    include: [
                        {
                            model: Pembeli,
                            as: 'Pembeli',
                            where: { id: pembeliId } 
                        },
                        {
                            model: Film,
                            as: 'Film'
                        }
                    ]
                }
            ]
        });
        console.log("Hasil transaksi:", transaksi); 
        if (transaksi.length === 0) {
            console.log("❌ Tidak ada transaksi ditemukan untuk pembeli ini");
            return res.status(404).json({ message: "Tidak ada film yang pernah dibeli" });
        }

        const films = transaksi.map(t => t.Cart.Film);
        console.log("✅ Film yang ditemukan:", films); 

        res.status(200).json({ message: "Film berhasil diambil", data: films });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan", error: error.message });
    }
};