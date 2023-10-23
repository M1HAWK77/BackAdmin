import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const ProductOutput = connection.define('productOutput', {
    idOutput: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dniUserOutput: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    departureDate: {
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