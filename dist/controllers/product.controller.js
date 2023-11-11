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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.newProduct = exports.getProductById = exports.getProducts = void 0;
const product_models_1 = require("../models/product.models");
const manage_error_1 = require("../error/manage.error");
//@getProducts: return all products from the database
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsList = yield product_models_1.Product.findAll();
        res.json({
            productsList
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getProducts = getProducts;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const findProduct = yield product_models_1.Product.findOne({ where: { idProduct: productId } });
        if (!findProduct) {
            return res.status(404).json({
                msg: manage_error_1.ErrorMessages.PRO_NOT_FOUND
            });
        }
        res.json(findProduct);
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getProductById = getProductById;
const newProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProduct, idCatBelong, productName, productPrice, stock, available } = req.body;
    const productExist = yield product_models_1.Product.findOne({ where: { idProduct: idProduct } });
    if (productExist) {
        return res.status(409).json({
            msg: manage_error_1.ErrorMessages.PRO_EXIST
        });
    }
    try {
        yield product_models_1.Product.create({
            idProduct: idProduct,
            idCatBelong: idCatBelong,
            productName: productName,
            productPrice: productPrice,
            stock: stock,
            available: available
        });
        res.json({
            msg: `El producto ${productName} ha sido creado satisfactoriamente`,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newProduct = newProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.id;
    const { idProductBelong, productName, productPrice, stock, available } = req.body;
    const productExist = yield product_models_1.Product.findOne({ where: { idProduct: productId } });
    if (!productExist) {
        res.status(404).json({
            msg: manage_error_1.ErrorMessages.PRO_NOT_FOUND
        });
    }
    try {
        yield product_models_1.Product.update({
            idProductBelong: idProductBelong,
            productName: productName,
            productPrice: productPrice,
            stock: stock,
            available: stock === 0 ? false : available
        }, { where: { idProduct: productId } });
        res.json({
            msg: `El producto ${productExist.productName} ha sido editado satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.id;
    const existProduct = yield product_models_1.Product.findOne({ where: { idProduct: idProduct } });
    if (!existProduct) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.PRO_NOT_FOUND
        });
    }
    try {
        yield product_models_1.Product.destroy({ where: { idProduct: idProduct } });
        res.json({
            msg: `El Producto ${existProduct.productName} ha sido eliminado satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.deleteProduct = deleteProduct;
