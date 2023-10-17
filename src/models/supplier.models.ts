import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const Supplier = connection.define('supplier', {
    idSup: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    nameSup: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    phoneSup: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    addressSup: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    emailSup: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});