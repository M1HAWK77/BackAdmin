"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const validateToken_routes_1 = __importDefault(require("./validateToken.routes"));
const router = (0, express_1.Router)();
router.get('/', validateToken_routes_1.default, category_controller_1.getCategories);
router.post('/', validateToken_routes_1.default, category_controller_1.newCategory);
router.get('/:id', validateToken_routes_1.default, category_controller_1.getCategoryById);
router.put('/:id', validateToken_routes_1.default, category_controller_1.updateCategory);
router.delete('/:id', validateToken_routes_1.default, category_controller_1.deleteCategory);
exports.default = router;
