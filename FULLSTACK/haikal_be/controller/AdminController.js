import Admin from "../models/AdminModels.js"
import { hashData, compareData } from "../utils/bycrptData.js"
import jwt from 'jsonwebtoken'

export const getAllAdmin = async (req, res) => {
    try {
        const data = await Admin.findAll(
            {
                attributes: ['id', 'email', 'username']
            }
        )
        res.status(200).json({ msg: 'mengambil seluruh data admin', data: data })
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}

export const getAllAdminById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await Admin.findByPk(id,
            {
                attributes: ['id', 'email', 'username']
            }
        )
        if (data) {
            res.status(200).json({ msg: 'berhasil mengambil data admin', data: data })
        } else {
            res.status(200).json({ msg: 'data tidak ada', data: null })
        }
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}



export const updateAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body
        await Admin.update({ username, email, password }, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json({ msg: 'data berhasil di update' })
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}

export const deleteAdmin = async (req, res) => {
    try {
        const { id } = req.params
        const data = await Admin.destroy({ where: { id } })
        res.status(400).json({ message: 'data dihapus' })
            .end()
    } catch (err) {
        res.status(500).json({ msg: err.msg })
    }

}

export const registerAdmin = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) res.status(400).json({ msg: 'pastikan mengisi semua data' })
    else {
        const resultHash = await hashData(password)
        try {
            await Admin.create(
                {
                    username,
                    email,
                    password: resultHash
                }
            )
            res.status(201).json({ message: 'register berhasil' })
        } catch (err) {
            res.status(500).json({ msg: err.msg })
        }

    }

}

export const loginAdmin = async (req, res) => {
    try {


        if (!req.body.email || !req.body.password) {
            res.status(400).json({ msg: 'pastikan mengisi semua data' })
        } else {

            const admin = await Admin.findOne({
                where: {
                    email: req.body.email
                }
            })
            if (admin !== null) {

                const math = await compareData(req.body.password, admin.password)
                if (!math) {
                    res.status(400).json({ msg: 'password tidak sesuai' })
                } else {
                    const adminId = admin.id
                    const username = admin.username
                    const email = admin.email

                    //? payload
                    const accessToken = jwt.sign({ adminId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
                        expiresIn: '1d'
                    })
               



                    res.status(200).json({ accessToken })
                }
            } else {
                
                res.status(500).json({ msg: 'email belum terdaftar' })
            }
        }
    } catch (err) {
        res.status(500).json({ msg: err.msg })

    }
}

