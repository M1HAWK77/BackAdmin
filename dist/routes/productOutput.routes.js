"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productOutput_controller_1 = require("../controllers/productOutput.controller");
const validateToken_routes_1 = __importDefault(require("./validateToken.routes"));
const router = (0, express_1.Router)();
router.get('/', validateToken_routes_1.default, productOutput_controller_1.getProductsOutput);
router.post('/', validateToken_routes_1.default, productOutput_controller_1.newProductOutput);
exports.default = router;
