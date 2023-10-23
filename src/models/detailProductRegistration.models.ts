import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const DetailRegistration = connection.define('detailProductRegistration', {
    idRegistrationBelong: { //fk
        type: DataTypes.INTEGER,
    },
    idProductBelong: { //fk
        type: DataTypes.STRING(30),
        allowNull: false
    },
    productQty:{
        type: DataTypes.INTEGER,
        allowNull:false
    }

});