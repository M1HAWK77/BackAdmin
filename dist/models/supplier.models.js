"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const connection_db_1 = __importDefault(require("../db/connection.db"));
const sequelize_1 = require("sequelize");
exports.Supplier = connection_db_1.default.define('supplier', {
    idSup: {
        type: sequelize_1.DataTypes.STRING(10),
        primaryKey: true
    },
    nameSup: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    phoneSup: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    addressSup: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    emailSup: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    }
});
