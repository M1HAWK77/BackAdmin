"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = require("../controllers/supplier.controller");
const router = (0, express_1.Router)();
router.get('/', supplier_controller_1.getSuppliers);
router.post('/', supplier_controller_1.newSupplier);
exports.default = router;
