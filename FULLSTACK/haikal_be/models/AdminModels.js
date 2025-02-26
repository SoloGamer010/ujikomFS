import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Admin = db.define(
    'Admin', {
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
},
    {
        tableName: 'admin'
    }
)

// Admin.hasMany(Film, {
//     foreignKey: 'AdminId',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });

// Film.belongsTo(Admin, {
//     foreignKey: 'AdminId',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
// });


export default Admin