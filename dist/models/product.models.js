"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const connection_db_1 = __importDefault(require("../db/connection.db"));
const sequelize_1 = require("sequelize");
exports.Product = connection_db_1.default.define('product', {
    idProduct: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true
    },
    idCatBelong: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    productName: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    productPrice: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    available: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    }
});
