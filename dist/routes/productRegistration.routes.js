"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRegistration_controller_1 = require("../controllers/productRegistration.controller");
const router = (0, express_1.Router)();
router.get('/', productRegistration_controller_1.getProductRegistration);
router.post('/', productRegistration_controller_1.newProductRegistration);
exports.default = router;
