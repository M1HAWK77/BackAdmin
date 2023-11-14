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
const chai_http_1 = __importDefault(require("chai-http"));
// Importa la función que deseas probar
const user_controller_1 = require("../controllers/user.controller");
//sinon.stub se usa para reemplazar las funciones User.findOne, bcrypt.compare y jwt.sign con versiones simuladas que devuelven valores predefinidos.
const sinon_1 = __importDefault(require("sinon"));
//para hacer las pruebas del login 
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const user_models_1 = require("../models/user.models");
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
//Indicamos que usamos http
chai.use(chai_http_1.default);
//Describo el grupo de pruebas
describe('Api-login', () => {
    it('Debe devolver true cuando se hayan identificado las credenciales'), () => __awaiter(void 0, void 0, void 0, function* () {
        //Datos en formato json
        const req = node_mocks_http_1.default.createRequest({
            method: 'POST',
            url: '/userLogin',
            body: {
                userName: 'ariel',
                passwordUser: '123'
            }
        });
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        sinon_1.default.stub(user_models_1.User, 'findOne').resolves({ passwordUser: 'hashedPassword' });
        sinon_1.default.stub(bcrypt, 'compare').resolves(true);
        sinon_1.default.stub(jwt, 'sign').returns('token');
        yield (0, user_controller_1.loginUser)(req, res);
        // Después de llamar a la función, puedes hacer aserciones sobre el objeto res
        // Por ejemplo, puedes verificar el código de estado HTTP y el cuerpo de la respuesta
        (0, chai_1.expect)(res.statusCode).to.equal(200);
        (0, chai_1.expect)(res.json.call('token')).to.equal('token').to.be.true;
        // expect(res.json.calledWith('token')).to.be.true;
    });
    // Define otra prueba  
    /*it('should return false when login is unsuccessful', () => {
        const result = login('wrong_username', 'wrong_password');
        expect(result).to.be.false;
    });*/
});
