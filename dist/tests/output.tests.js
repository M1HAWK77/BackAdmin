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
// Importa la biblioteca Chai y los estilos de aserción que deseas utilizar
const chai_1 = require("chai");
// Importa la función que deseas probar
const node_mocks_http_1 = __importDefault(require("node-mocks-http"));
const productOutput_models_1 = require("../models/productOutput.models");
describe('output-test', () => {
    it('Devuelve true si trae 2 salidas de productos', () => __awaiter(void 0, void 0, void 0, function* () {
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const products = yield productOutput_models_1.ProductOutput.findAll({ limit: 2 });
        (0, chai_1.expect)(products).to.have.lengthOf(2);
    }));
});
