"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRegistration = void 0;
const connection_db_1 = __importDefault(require("../db/connection.db"));
const sequelize_1 = require("sequelize");
exports.ProductRegistration = connection_db_1.default.define('productRegistration', {
    idReg: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    dniUserReceive: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    idSup: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false
    },
    admissionDate: {
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
