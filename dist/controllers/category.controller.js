"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategory = exports.getCategories = void 0;
const getCategories = (req, res) => {
    res.json({
        msg: 'All categories'
    });
};
exports.getCategories = getCategories;
const createCategory = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'Category created',
        body
    });
};
exports.createCategory = createCategory;
