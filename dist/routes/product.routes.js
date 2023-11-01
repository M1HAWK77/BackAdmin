"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@Router: help us to manage our api routes
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
//routes
router.get('/', product_controller_1.getProducts);
router.post('/', product_controller_1.newProduct);
router.get('/:id', product_controller_1.getProductById);
router.put('/:id', product_controller_1.updateProduct);
router.delete('/:id', product_controller_1.deleteProduct);
//export generated routes
exports.default = router;
