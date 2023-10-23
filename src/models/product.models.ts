import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const Product = connection.define('product', {
    idProduct: {
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    idCatBelong: { //fk
        type: DataTypes.STRING(30),
        allowNull: false
    },
    productName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    productPrice: {
        type: DataTypes.DOUBLE,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});
