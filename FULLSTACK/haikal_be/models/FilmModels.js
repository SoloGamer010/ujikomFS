import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Film = db.define(
    'Film', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    trailer_link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    actors: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    producers : {
        type: DataTypes.STRING,
        allowNull: false,
    },
    release_date : {
        type: DataTypes.DATE,
        allowNull: false,
    },
    duration : {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating : {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
},
    {
        tableName: 'film',
        timestamps: false
    }
)



export default Film