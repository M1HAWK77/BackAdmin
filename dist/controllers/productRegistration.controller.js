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
exports.newProductRegistration = exports.getProductRegistrationById = exports.getProductRegistration = void 0;
const productRegistration_models_1 = require("../models/productRegistration.models");
const detailProductRegistration_models_1 = require("../models/detailProductRegistration.models");
const manage_error_1 = require("../error/manage.error");
const product_models_1 = require("../models/product.models");
//@getProductRegistration: return all products from the database
const getProductRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerListRegistration = yield productRegistration_models_1.ProductRegistration.findAll();
        const detailListRegistration = yield detailProductRegistration_models_1.DetailRegistration.findAll({ order: ['idRegistrationBelong'] });
        res.json({
            headerListRegistration,
            detailListRegistration
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getProductRegistration = getProductRegistration;
const getProductRegistrationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrationId = req.params.id;
        const findRegister = yield productRegistration_models_1.ProductRegistration.findOne({ where: { idReg: registrationId } });
        if (!findRegister) {
            return res.status(404).json({
                msg: manage_error_1.ErrorMessages.PRO_NOT_FOUND
            });
        }
        res.json(findRegister);
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getProductRegistrationById = getProductRegistrationById;
const newProductRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dniUserReceive, idSup, totalProduct, totalCost, products } = req.body;
    // calculate totalProductEstimated y totalCostEstimated
    let totalProductEstimated = 0;
    let totalCostEstimated = 0;
    for (let product of products) {
        //find the value of the product
        let productId = product.idProductBelong;
        let findProduct = yield product_models_1.Product.findOne({ where: { idProduct: productId } });
        totalProductEstimated += Number(product.productQty);
        totalCostEstimated += Number(findProduct === null || findProduct === void 0 ? void 0 : findProduct.getDataValue('productPrice')) * Number(product.productQty);
        //Impresiones ver que pasa
        console.log(findProduct === null || findProduct === void 0 ? void 0 : findProduct.getDataValue('stock'));
        console.log(product.productQty);
        console.log(Number(findProduct === null || findProduct === void 0 ? void 0 : findProduct.getDataValue('stock')) + Number(product.productQty));
        //update the quantity of products in my table Products
        findProduct === null || findProduct === void 0 ? void 0 : findProduct.setDataValue('stock', Number(findProduct.getDataValue('stock')) + Number(product.productQty));
        yield (findProduct === null || findProduct === void 0 ? void 0 : findProduct.save());
    }
    try {
        //This method return an instance of the created object,
        //so im gonna catch it to show in the message
        //admissionDate: Date.now().toLocaleString(),
        let newRegister = yield productRegistration_models_1.ProductRegistration.create({
            dniUserReceive: dniUserReceive,
            idSup: idSup,
            admissionDate: new Date().toLocaleString(),
            totalProducts: totalProductEstimated,
            totalCost: totalCostEstimated
        });
        for (let product of products) {
            product.idReg = newRegister.getDataValue('idReg');
            yield detailProductRegistration_models_1.DetailRegistration.create({
                idRegistrationBelong: product.idReg,
                idProductBelong: product.idProductBelong,
                productQty: product.productQty
            });
        }
        res.json({
            msg: `El registro ${newRegister.getDataValue('idReg')} se creo satisfactoriamente con ${products.length} productos`,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newProductRegistration = newProductRegistration;
