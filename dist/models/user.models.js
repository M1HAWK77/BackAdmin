"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const connection_db_1 = __importDefault(require("../db/connection.db"));
const sequelize_1 = require("sequelize");
exports.User = connection_db_1.default.define('usuarios', {
    dniUser: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true
    },
    nameUser: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    lastNameUser: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    userName: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    passwordUser: {
        type: sequelize_1.DataTypes.STRING(60),
        allowNull: false
    },
    userRole: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: true
    }
});
