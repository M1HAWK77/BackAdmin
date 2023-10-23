"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductOutput = void 0;
const connection_db_1 = __importDefault(require("../db/connection.db"));
const sequelize_1 = require("sequelize");
exports.ProductOutput = connection_db_1.default.define('productOutput', {
    idOutput: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dniUserOutput: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    departureDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    totalProducts: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    totalCost: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: true
    }
});
