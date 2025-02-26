import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Cart from "./CartModels.js";

const Transaksi = db.define(
    'Transaksi', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    transaction_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payment_method: {
        type: DataTypes.STRING,//(misalnya: 'credit_card', 'ewallet', 'bank_transfer')
        allowNull: false,
    },

},
    {
        tableName: 'transaksi'
    }
)


Cart.hasOne(Transaksi, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Transaksi.belongsTo(Cart, {
    foreignKey: 'CartId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})



export default Transaksi