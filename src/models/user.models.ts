import connection from '../db/connection.db';
import { DataTypes } from 'sequelize';


export const User = connection.define('usuarios', {
    dniUser: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    nameUser: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    lastNameUser: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    passwordUser: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    userRole: {
        type: DataTypes.STRING(20),
        allowNull: true
    }
});