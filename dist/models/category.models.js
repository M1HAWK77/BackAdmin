"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const connection_db_1 = __importDefault(require("../db/connection.db"));
const sequelize_1 = require("sequelize");
/*Use pattern define because it's the same with the pattern extend Model
in this case have a class is irrelevant since sequelize doesn't admit
getters or setters*/
exports.Category = connection_db_1.default.define('category', {
    idCat: {
        type: sequelize_1.DataTypes.STRING(30),
        primaryKey: true
    },
    nameCat: {
        type: sequelize_1.DataTypes.STRING(30)
    },
    descriptionCat: {
        type: sequelize_1.DataTypes.STRING(100)
    }
});
