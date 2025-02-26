import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Pembeli from "./PembeliModels.js";
import Film from "./FilmModels.js";

const Cart = db.define(
    'Cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'cart'
    }
)

Pembeli.hasOne(Cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Cart.belongsTo(Pembeli, {
    foreignKey: 'PembeliId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})
Film.hasOne(Cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Cart.belongsTo(Film, {
    foreignKey: 'FilmId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})



export default Cart