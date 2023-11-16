"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
// Importa la biblioteca Chai y los estilos de aserción que deseas utilizar
const chai_1 = require("chai");
// Importa la función que deseas probar
const user_controller_1 = require("../controllers/user.controller");
//para hacer las pruebas del login 
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcrypt"));
const user_models_1 = require("../models/user.models");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
//Indicamos que usamos http
//Describo el grupo de pruebas
describe('Api-login', () => {
    it('Debe devolver true cuando se hayan identificado las credenciales, y se verifique el token', () => __awaiter(void 0, void 0, void 0, function* () {
        let userInput = 'ariel';
        let passwordInput = '123';
        //Datos en formato json
        const req = node_mocks_http_1.default.createRequest({
            method: 'POST',
            url: 'http://localhost:3001/api/users/userLogin',
            body: {
                userName: userInput,
                passwordUser: passwordInput
            }
        });
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const userExist = yield user_models_1.User.findOne({ where: { userName: userInput } });
        bcrypt.compare(passwordInput, userExist.passwordUser);
        const token = jwt.sign({
            userName: userInput
        }, process.env.SECRET_KEY || 'randomPasswordGenerator345');
        yield (0, user_controller_1.loginUser)(req, res);
        (0, chai_1.expect)(res.statusCode).to.equal(200);
        (0, chai_1.expect)(token).to.exist;
    }));
    // Define otra prueba  
    it('Retorna false ya que la contraseña no coincide', () => __awaiter(void 0, void 0, void 0, function* () {
        let userInput = 'ariel';
        let passwordInput = '1234';
        const userExist = yield user_models_1.User.findOne({ where: { userName: userInput } });
        const comparePassword = yield bcrypt.compare(passwordInput, userExist.passwordUser);
        (0, chai_1.expect)(comparePassword).to.be.false;
    }));
    // Define otra prueba  
    it('Retorna false ya que el usuario no existe', () => __awaiter(void 0, void 0, void 0, function* () {
        let userInput = 'kxm1';
        const userExist = yield user_models_1.User.findOne({ where: { userName: userInput } });
        (0, chai_1.expect)(userExist).to.be.null;
    }));
});
