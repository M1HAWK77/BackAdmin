"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supplier_controller_1 = require("../controllers/supplier.controller");
const validateToken_routes_1 = __importDefault(require("./validateToken.routes"));
const router = (0, express_1.Router)();
router.get('/', validateToken_routes_1.default, supplier_controller_1.getSuppliers);
router.post('/', validateToken_routes_1.default, supplier_controller_1.newSupplier);
router.get('/:id', validateToken_routes_1.default, supplier_controller_1.getSupplierById);
router.put('/:id', validateToken_routes_1.default, supplier_controller_1.updateSupplier);
router.delete('/:id', validateToken_routes_1.default, supplier_controller_1.deleteSupplier);
exports.default = router;
