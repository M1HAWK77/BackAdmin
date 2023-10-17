import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const DetailOutput = connection.define('detailProductOutput', {
    idOutputBelong: {
        type: DataTypes.INTEGER,
    },
    idProductBelong: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    productQty:{
        type: DataTypes.INTEGER,
        allowNull:false
    }

});