import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const ProductRegistration = connection.define('productRegistration', {
    idReg: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true
    },
    dniUserReceive: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    idSup: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    admissionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    totalProducts: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    totalCost: {
        type: DataTypes.DOUBLE,
        allowNull: true
    }
});
