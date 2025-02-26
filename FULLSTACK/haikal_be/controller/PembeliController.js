import Pembeli from "../models/PembeliModels.js"
// import { hashData, compareData } from "../utils/bycrptData.js"
import jwt from "jsonwebtoken";
import { hashData, compareData } from "../utils/bycrptData.js"

export const getAllPembeli = async (req, res) => {
    try {
        const data = await Pembeli.findAll()
        res.status(200).json({ msg: 'mengambil seluruh data', data: data })
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}

export const loginPembeli = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            res.status(400).json({ msg: 'pastikan mengisi semua data' });
        } else {
            const pembeli = await Pembeli.findOne({
                where: { email: req.body.email }
            });

            if (pembeli !== null) {
                const match = await compareData(req.body.password, pembeli.password);
                if (!match) {
                    res.status(400).json({ msg: 'password tidak sesuai' });
                } else {
                    // Buat token JWT
                    const token = jwt.sign({ id: pembeli.id }, "secretkey", { expiresIn: "1h" });

                    res.status(200).json({
                        msg: 'berhasil login',
                        userId: pembeli.id, // Tambahkan ini
                        token: token // Tambahkan ini
                    });
                }
            } else {
                res.status(400).json({ msg: 'email belum terdaftar' });
            }
        }
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};


// export const loginPembeli = async (req, res) => {
//     try {
//       const { username, email } = req.body;
  
//       // Cek apakah username dan email diinputkan
//       if (!username || !email) {
//         return res.status(400).json({ msg: "Nama dan email harus diisi" });
//       }
  
//       // Cari pembeli berdasarkan username dan email
//       const pembeli = await Pembeli.findOne({
//         where: { username, email },
//       });
  
//       if (!pembeli) {
//         return res.status(404).json({ msg: "Pembeli tidak ditemukan" });
//       }
  
//       res.status(200).json({
//         msg: "Login berhasil",
//         data: pembeli, // Kirim data pembeli ke frontend
//       });
//     } catch (err) {
//       res.status(500).json({ msg: err.message });
//     }
//   };
  

export const getAllPembeliById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Pembeli.findByPk(id)
        if (data) {
            res.status(200).json({ msg: 'berhasil mengambil data admin', data: data })
        } else {
            res.status(200).json({ msg: 'data tidak ada', data: null })
        }
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}

export const registerPembeli = async (req, res) => {
    const { username, email, password, phone_number} = req.body
    if (!username || !email || !password || !phone_number) res.status(400).json({ msg: 'pastikan mengisi semua data' })
    else {
        const resultHash = await hashData(password)
        try {
            await Pembeli.create(
                {
                    username,
                    email,
                    phone_number,
                    password: resultHash
                }
            )
            res.status(201).json({ message: 'register berhasil' })
        } catch (err) {
            res.status(500).json({ msg: err.msg })
        }

    }

}

// export const createPembeli = async (req, res) => {
//     try {
//         const { username, email } = req.body;

//         // Validasi input
//         if (!username || !email) {
//             return res.status(400).json({ message: 'Nama dan email harus diisi' });
//         }

//         // Buat Pembeli baru
//         const newPembeli = await Pembeli.create({ username, email });

//         res.status(201).json({ message: 'Pembeli berhasil dibuat', data: newPembeli });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Terjadi kesalahan', error: error.message });
//     }

// }
export const updatePembeli = async (req, res) => {
    try {
        if (!req.body.username || !req.body.email || !req.body.password || !req.body.phone_number ) {
            res.status(400).json({ msg: 'pastikan mengisi semua data' })
        } else {
            
            const { username, email,password,phone_number } = req.body
            const resultHash = await hashData(password)
            const data = await Pembeli.update({ username, email,password:resultHash,phone_number}, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).json({ message: 'Pembeli berhasil diupdate' });
        }
    } catch (err) {
        res.status(500).json({ msg: err.message })
    }

}


export const deletePembeli = async (req, res) => {
    try {
        const { id } = req.params;
        await Pembeli.destroy({
            where: {
                id: id,
            },
        });

        res.status(200).json({ message: 'Data berhasil di hapus' })

    } catch (error) {
        res.status(500).json({ message: 'Gagal menghapus data.', error });
    }
}
