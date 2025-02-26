import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.status(403).json({msg:'Not token'})
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,async (err, decode) => {
            if (err)  {
                res.status(403).json({msg:'the token is incorrect or has expired'})
            }else{
                //forbiden 
            if (decode) {
                next()
            }
            else {
                res.status(403).json({msg:'not found'})
            }
        }

        })
    }

}