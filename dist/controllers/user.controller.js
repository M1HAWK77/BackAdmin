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
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_models_1 = require("../models/user.models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*Destructuring req.body(similar to type req.body.userName), in my json i gonna received
    the params that i need ex. dniUser- nameUser*/
    const { dniUser, nameUser, lastNameUser, userName, passwordUser, userRole } = req.body;
    //validate if user exist on the database
    const user = yield user_models_1.User.findOne({ where: { dniUser: dniUser } });
    if (user) {
        return res.status(400).json({
            msg: "The user already exist with that dni"
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
            msg: `User ${nameUser} ${lastNameUser} created successfully!`
        });
    }
    catch (error) {
        res.status(400).json({
            msg: "An error has ocurred",
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
            msg: `We can't find a user with that name ${userName}`
        });
    }
    console.log(passwordUser);
    console.log(userExist.passwordUser);
    //validate password
    //return true or false
    const passwordValidator = yield bcrypt_1.default.compare(passwordUser, userExist.passwordUser);
    console.log(passwordValidator);
    if (!passwordValidator) {
        return res.status(400).json({
            msg: "Wrong password"
        });
    }
    //generate token 
    const token = jsonwebtoken_1.default.sign({
        userName: userName
    }, process.env.SECRET_KEY || 'randomPasswordGenerator345');
    res.json(token);
});
exports.loginUser = loginUser;
