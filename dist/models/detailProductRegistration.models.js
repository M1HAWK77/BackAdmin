"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailRegistration = void 0;
const connection_db_1 = __importDefault(require("../db/connection.db"));
const sequelize_1 = require("sequelize");
exports.DetailRegistration = connection_db_1.default.define('detailProductRegistration', {
    idRegistrationBelong: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    idProductBelong: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    productQty: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
});
