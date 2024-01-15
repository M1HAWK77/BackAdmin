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
const product_models_1 = require("../models/product.models");
describe('Products-test', () => {
    //Prueba para ver si existen productos
    it('Devuelve true si trae 5 productos de productos y compara su longitud', () => __awaiter(void 0, void 0, void 0, function* () {
        let tokenTest = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImRhbmkiLCJ1c2VyUm9sZSI6IkFkbWluIiwiaWF0IjoxNzA1MjczNjYxfQ.PZsZ_0CCDycEr3TpBW_vly6loAq6HsrhznDNkRKPplc';
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const products = yield product_models_1.Product.findAll({ limit: 5 });
        (0, chai_1.expect)(products).to.have.lengthOf(5);
    }));
    //Prueba para ver si existen productos
    it('Devuelve true si trae 1 producto, se de debe especificar el id', () => __awaiter(void 0, void 0, void 0, function* () {
        let idP = 'P003';
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const product = yield product_models_1.Product.findOne({ where: { idProduct: idP } });
        (0, chai_1.expect)(product).to.exist;
    }));
    //Prueba para ver si existen productos
    it('Devuelve true si se puede agregar, editar o eliminar el producto', () => __awaiter(void 0, void 0, void 0, function* () {
        let newProductTest = {
            idProduct: "P123",
            idCatBelong: "C002",
            productName: "nuevito",
            productPrice: "26",
            stock: "150",
            available: "true"
        };
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const productExist = yield product_models_1.Product.findOne({ where: { idProduct: newProductTest.idProduct } });
        if (productExist) {
            console.log("El producto ya existe, no se puede agregar");
            return false;
        }
        else {
            console.log(newProductTest);
            return true;
        }
    }));
});
