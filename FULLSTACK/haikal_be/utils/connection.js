import { Sequelize } from "sequelize";
import 'dotenv/config'

const db = new Sequelize(process.env.DB_NAME,process.env.DB_USER||'root','',{
    dialect:'mysql'
})

export default db