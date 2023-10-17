import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const DetailRegistration = connection.define('detailProductRegistration', {
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