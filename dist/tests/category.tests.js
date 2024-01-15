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
const category_models_1 = require("../models/category.models");
describe('categories-test', () => {
    //Prueba para ver si existen productos
    it('Devuelve true si trae 5 Categorias y compara su longitud', () => __awaiter(void 0, void 0, void 0, function* () {
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const categories = yield category_models_1.Category.findAll({ limit: 5 });
        (0, chai_1.expect)(categories).to.have.lengthOf(5);
    }));
    //Prueba para ver si existen productos
    it('Devuelve true si trae 1 Categoria, se de debe especificar el id', () => __awaiter(void 0, void 0, void 0, function* () {
        let idP = 'EN001';
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const product = yield category_models_1.Category.findOne({ where: { idCat: idP } });
        (0, chai_1.expect)(product).to.exist;
    }));
    //Prueba para ver si existen productos
    it('Devuelve true si se puede agregar, editar o eliminar la categoria', () => __awaiter(void 0, void 0, void 0, function* () {
        let newCategoryTest = {
            idCat: "testCategoria",
            nameCat: "testCategoria",
            descriptionCat: "testCategoria",
        };
        //Simulo Respuesta del servidor
        const res = node_mocks_http_1.default.createResponse();
        const categoryExist = yield category_models_1.Category.findOne({ where: { idCat: newCategoryTest.idCat } });
        if (categoryExist) {
            console.log("El producto ya existe, no se puede agregar");
            return false;
        }
        else {
            console.log(newCategoryTest);
            return true;
        }
    }));
});
