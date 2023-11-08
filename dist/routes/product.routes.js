"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//@Router: help us to manage our api routes
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const validateToken_routes_1 = __importDefault(require("./validateToken.routes"));
const router = (0, express_1.Router)();
//routes
router.get('/', validateToken_routes_1.default, product_controller_1.getProducts);
router.post('/', validateToken_routes_1.default, product_controller_1.newProduct);
router.get('/:id', validateToken_routes_1.default, product_controller_1.getProductById);
router.put('/:id', validateToken_routes_1.default, product_controller_1.updateProduct);
router.delete('/:id', validateToken_routes_1.default, product_controller_1.deleteProduct);
//export generated routes
exports.default = router;
