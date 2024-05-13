"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getUsers = exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = require("../models/user.models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const manage_error_1 = require("../error/manage.error");
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*Destructuring req.body(similar to type req.body.userName), in my json i gonna received
    the params that i need ex. dniUser- nameUser*/
    const { dniUser, nameUser, lastNameUser, userName, passwordUser, userRole } = req.body;
    //validate if user exist on the database
    const user = yield user_models_1.User.findOne({ where: { dniUser: dniUser } });
    if (user) {
        return res.status(409).json({
            msg: manage_error_1.ErrorMessages.USER_EXIST
        });
    }
    //Encrypt password
    const hashedPassword = yield bcrypt_1.default.hash(passwordUser, 10);
    try {
        //Save data in the database
        yield user_models_1.User.create({
            dniUser: dniUser,
            nameUser: nameUser,
            lastNameUser: lastNameUser,
            userName: userName,
            passwordUser: hashedPassword,
            userRole: userRole
        });
        res.json({
            msg: `Usuario ${nameUser} ${lastNameUser} ha sido creado satisfactoriamente!`
        });
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, passwordUser } = req.body;
    //validate if user exist on the database, any accept all
    const userExist = yield user_models_1.User.findOne({ where: { userName: userName } });
    if (!userExist) {
        return res.status(400).json({
            msg: `No se encontro un usuario con el nombre: ${userName}`
        });
    }
    //validate password
    //return true or false
    const passwordValidator = yield bcrypt_1.default.compare(passwordUser, userExist.passwordUser);
    if (!passwordValidator) {
        return res.status(400).json({
            msg: manage_error_1.ErrorMessages.WRONG_PASS
        });
    }
    //generate token 
    const token = jsonwebtoken_1.default.sign({
        userName: userName
    }, process.env.SECRET_KEY || 'randomPasswordGenerator345');
    res.json(token);
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersList = yield user_models_1.User.findAll();
        res.json({
            usersList
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR
        });
    }
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.params.id;
    const existUser = yield user_models_1.User.findOne({ where: { dniUser: idUser } });
    if (!existUser) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.USER_EXIST
        });
    }
    try {
        yield user_models_1.User.destroy({ where: { dniUser: idUser } });
        res.json({
            msg: `El usuario ${existUser.nameUser} ${existUser.lastNameUser} ha sido removido satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.deleteUser = deleteUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idUser = req.params.id;
    const { nameUser, lastNameUser, userName, userRole } = req.body;
    const existUser = yield user_models_1.User.findOne({ where: { dniUser: idUser } });
    if (!existUser) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.SUP_NOT_FOUND
        });
    }
    try {
        yield user_models_1.User.update({
            nameUser: nameUser,
            lastNameUser: lastNameUser,
            userName: userName,
            userRole: userRole
        }, { where: { dniUser: idUser } });
        res.json({
            msg: `El usuario ${existUser.nameUser} ha sido editado satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.updateUser = updateUser;
