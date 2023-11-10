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
exports.newProductOutput = exports.getProductsOutput = void 0;
const productOutput_models_1 = require("../models/productOutput.models");
const manage_error_1 = require("../error/manage.error");
const product_models_1 = require("../models/product.models");
const detailProductOutput_models_1 = require("../models/detailProductOutput.models");
const getProductsOutput = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productsList = yield productOutput_models_1.ProductOutput.findAll();
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
exports.getProductsOutput = getProductsOutput;
const newProductOutput = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dniUserOutput, products } = req.body;
    // calculate totalProductEstimated y totalCostEstimated
    let totalProductEstimated = 0;
    let totalCostEstimated = 0;
    for (let product of products) {
        //find the value of the product
        let productId = product.idProductBelong;
        let findProduct = yield product_models_1.Product.findOne({ where: { idProduct: productId } });
        totalProductEstimated += product.productQty;
        totalCostEstimated += (findProduct === null || findProduct === void 0 ? void 0 : findProduct.getDataValue('productPrice')) * product.productQty;
        //update the quantity of products in my table Products
        findProduct === null || findProduct === void 0 ? void 0 : findProduct.setDataValue('stock', findProduct.getDataValue('stock') - product.productQty);
        yield (findProduct === null || findProduct === void 0 ? void 0 : findProduct.save());
    }
    try {
        //This method return an instance of the created object,
        //so im gonna catch it to show in the message
        //admissionDate: Date.now().toLocaleString(),
        let newOutput = yield productOutput_models_1.ProductOutput.create({
            dniUserOutput: dniUserOutput,
            departureDate: new Date().toLocaleString(),
            totalProducts: totalProductEstimated,
            totalCost: totalCostEstimated
        });
        for (let product of products) {
            product.idOutput = newOutput.getDataValue('idOutput');
            yield detailProductOutput_models_1.DetailOutput.create({
                idOutputBelong: product.idOutput,
                idProductBelong: product.idProductBelong,
                productQty: product.productQty
            });
        }
        res.json({
            msg: `The product ${newOutput.getDataValue('idReg')} was succesfully removed with ${products.length} products`,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newProductOutput = newProductOutput;
