"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@Router: help us to manage our api routes
const express_1 = require("express");
const product_controller_1 = require("../controllers/product.controller");
const router = (0, express_1.Router)();
//routes
router.get('/', product_controller_1.getProducts);
router.post('/', product_controller_1.newProduct);
//export generated routes
exports.default = router;
