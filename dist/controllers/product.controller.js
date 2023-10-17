"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProduct = exports.getProducts = void 0;
//@getProducts: return all products from the database
const getProducts = (req, res) => {
    res.json({
        msg: "Get Products"
    });
};
exports.getProducts = getProducts;
const newProduct = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'New Product',
        body
    });
};
exports.newProduct = newProduct;
