"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validateToken_routes_1 = __importDefault(require("./validateToken.routes"));
const router = (0, express_1.Router)();
router.post('/', validateToken_routes_1.default, user_controller_1.newUser);
router.get('/', validateToken_routes_1.default, user_controller_1.getUsers);
router.post('/userLogin', user_controller_1.loginUser);
router.delete('/:id', validateToken_routes_1.default, user_controller_1.deleteUser);
router.put('/:id', validateToken_routes_1.default, user_controller_1.updateUser);
exports.default = router;
