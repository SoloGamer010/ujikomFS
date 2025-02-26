import express from 'express'
import { deleteAdmin, getAllAdmin, getAllAdminById, loginAdmin,  registerAdmin, updateAdmin } from '../controller/AdminController.js'
// import { getAllAdmin,getAllAdminById, updateAdmin, deleteAdmin, registerAdmin, loginAdmin, } from '../controller/AdminController.js'
import { verifyToken } from '../middleware/verifyToken.js'
// import { refreshToken } from '../controller/refreshToken.js'
const RouterAdmin = express.Router()

RouterAdmin.get('/',verifyToken,getAllAdmin)
RouterAdmin.get('/find/:id',verifyToken,getAllAdminById)
// RouterAdmin.post('/token',refreshToken)

RouterAdmin.post('/register',registerAdmin)
RouterAdmin.post('/login',loginAdmin)
// RouterAdmin.post('/loginB',loginAdminB)

RouterAdmin.put('/update/:id',updateAdmin)

RouterAdmin.delete('/delete/:id',deleteAdmin)
// RouterAdmin.delete('/logout',logoutAdmin)

export default RouterAdmin