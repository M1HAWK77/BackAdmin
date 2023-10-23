import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const DetailOutput = connection.define('detailProductOutput', {
    idOutputBelong: {//fk
        type: DataTypes.INTEGER,
    },
    idProductBelong: {//fk
        type: DataTypes.STRING(30),
        allowNull: false
    },
    productQty:{
        type: DataTypes.INTEGER,
        allowNull:false
    }

});