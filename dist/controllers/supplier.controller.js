"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newSupplier = exports.getSuppliers = void 0;
const getSuppliers = (req, res) => {
    res.json({
        msg: 'Suppliers list'
    });
};
exports.getSuppliers = getSuppliers;
const newSupplier = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'New Supplier',
        body
    });
};
exports.newSupplier = newSupplier;
