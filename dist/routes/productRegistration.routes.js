"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRegistration_controller_1 = require("../controllers/productRegistration.controller");
const validateToken_routes_1 = __importDefault(require("./validateToken.routes"));
const router = (0, express_1.Router)();
router.get('/', validateToken_routes_1.default, productRegistration_controller_1.getProductRegistration);
router.post('/', validateToken_routes_1.default, productRegistration_controller_1.newProductRegistration);
exports.default = router;
