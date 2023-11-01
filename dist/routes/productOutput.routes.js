"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productOutput_controller_1 = require("../controllers/productOutput.controller");
const router = (0, express_1.Router)();
router.get('/', productOutput_controller_1.getProductsOutput);
router.post('/');
exports.default = router;
