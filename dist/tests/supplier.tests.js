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
const supplier_models_1 = require("../models/supplier.models");
describe('Suppliers-test', () => {
    //Prueba para ver si existen productos
    it('Devuelve true si trae 3 proveedores', () => __awaiter(void 0, void 0, void 0, function* () {
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const supplier = yield supplier_models_1.Supplier.findAll({ limit: 3 });
        (0, chai_1.expect)(supplier).to.have.lengthOf(3);
    }));
    //Prueba para ver si existen productos
    it('Devuelve true si trae 1 producto, se de debe especificar el id', () => __awaiter(void 0, void 0, void 0, function* () {
        let idP = 'dfs';
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const supplier = yield supplier_models_1.Supplier.findOne({ where: { idSup: idP } });
        (0, chai_1.expect)(supplier).to.exist;
    }));
    //Prueba para ver si existen productos
    it('Devuelve true si se puede agregar, editar o eliminar el proveedor', () => __awaiter(void 0, void 0, void 0, function* () {
        let newSupplierTest = {
            idSup: "SUPTest",
            nameSup: "Github",
            phoneSup: "098745681",
            addressSup: "las carmelitas",
            emailSup: "test@gmail.com"
        };
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const userExist = yield supplier_models_1.Supplier.findOne({ where: { idSup: newSupplierTest.idSup } });
        if (userExist) {
            console.log("No se puede agregar a ese proveedor porque ya existe");
            return false;
        }
        else {
            console.log(newSupplierTest);
            return true;
        }
    }));
});
