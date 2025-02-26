import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Pembeli = db.define(
    'Pembeli', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },

},
    {
        tableName: 'pembeli'
    }
)



export default Pembeli