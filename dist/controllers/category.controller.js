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
exports.deleteCategory = exports.updateCategory = exports.newCategory = exports.getCategoryById = exports.getCategories = void 0;
const category_models_1 = require("../models/category.models");
const manage_error_1 = require("../error/manage.error");
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoriesList = yield category_models_1.Category.findAll();
        res.json({
            categoriesList
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR
        });
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const findCategory = yield category_models_1.Category.findOne({ where: { idCat: id } });
        if (!findCategory) {
            return res.status(404).json({
                msg: manage_error_1.ErrorMessages.CAT_NOT_FOUND
            });
        }
        res.json(findCategory);
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getCategoryById = getCategoryById;
const newCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idCat, nameCat, descriptionCat } = req.body;
    const existCategory = yield category_models_1.Category.findOne({ where: { idCat: idCat } });
    if (existCategory) {
        return res.status(409).json({
            msg: manage_error_1.ErrorMessages.CAT_EXIST
        });
    }
    try {
        yield category_models_1.Category.create({
            idCat: idCat,
            nameCat: nameCat,
            descriptionCat: descriptionCat,
        });
        res.json({
            msg: `La Categoria ${nameCat} ha sido creada satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newCategory = newCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCat = req.params.id;
    const { nameCat, descriptionCat } = req.body;
    const existCategory = yield category_models_1.Category.findOne({ where: { idCat: idCat } });
    if (!existCategory) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.CAT_NOT_FOUND
        });
    }
    try {
        yield category_models_1.Category.update({
            nameCat: nameCat,
            descriptionCat: descriptionCat,
        }, { where: { idCat: idCat } });
        res.json({
            msg: `La Categoria ${existCategory.nameCat} ha sido editada satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCat = req.params.id;
    const existCategory = yield category_models_1.Category.findOne({ where: { idCat: idCat } });
    if (!existCategory) {
        return res.status(404).json({
            msg: manage_error_1.ErrorMessages.CAT_NOT_FOUND
        });
    }
    try {
        yield category_models_1.Category.destroy({ where: { idCat: idCat } });
        res.json({
            msg: `La Categoria ${existCategory.nameCat} ha sido eliminada satisfactoriamente`
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.deleteCategory = deleteCategory;
