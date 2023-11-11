"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSupplier = exports.updateSupplier = exports.newSupplier = exports.getSupplierById = exports.getSuppliers = void 0;
const supplier_models_1 = require("../models/supplier.models");
const manage_error_1 = require("../error/manage.error");
const getSuppliers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const suppliersList = yield supplier_models_1.Supplier.findAll();
        res.json({
            suppliersList
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR
        });
    }
});
exports.getSuppliers = getSuppliers;
//URL example http://localhost:3001/api/suppliers/F001
const getSupplierById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idSupplier = req.params.id;
        const findSupplier = yield supplier_models_1.Supplier.findOne({ where: { idSup: idSupplier } });
        if (!findSupplier) {
            return res.status(404).json({
                msg: manage_error_1.ErrorMessages.SUP_NOT_FOUND
            });
        }
        res.json(findSupplier);
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getSupplierById = getSupplierById;
const newSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idSup, nameSup, phoneSup, addressSup, emailSup } = req.body;
    const existSupplier = yield supplier_models_1.Supplier.findOne({ where: { idSup: idSup } });
    if (existSupplier) {
        return res.status(409).json({
            msg: manage_error_1.ErrorMessages.SUP_EXIST
        });
    }
    try {
        yield supplier_models_1.Supplier.create({
            idSup: idSup,
            nameSup: nameSup,
            phoneSup: phoneSup,
            addressSup: addressSup,
            emailSup: emailSup
        });
        res.json({
            msg: `El proveedor ${nameSup} se creo satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newSupplier = newSupplier;
/*Best practice
    send on the url the key of the object to edit
    body: the values to edit
*/
//URL example http://localhost:3001/api/suppliers/F001
const updateSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSup = req.params.id;
    const { nameSup, phoneSup, addressSup, emailSup } = req.body;
    const existSupplier = yield supplier_models_1.Supplier.findOne({ where: { idSup: idSup } });
    if (!existSupplier) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.SUP_NOT_FOUND
        });
    }
    try {
        yield supplier_models_1.Supplier.update({
            nameSup: nameSup,
            phoneSup: phoneSup,
            addressSup: addressSup,
            emailSup: emailSup
        }, { where: { idSup: idSup } });
        res.json({
            msg: `El proveedor ${existSupplier.nameSup} ha sido editado satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.updateSupplier = updateSupplier;
const deleteSupplier = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSup = req.params.id;
    const existSupplier = yield supplier_models_1.Supplier.findOne({ where: { idSup: idSup } });
    if (!existSupplier) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.SUP_NOT_FOUND
        });
    }
    try {
        yield supplier_models_1.Supplier.destroy({ where: { idSup: idSup } });
        res.json({
            msg: `El proveedor ${existSupplier.nameSup} ha sido removido satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.deleteSupplier = deleteSupplier;
