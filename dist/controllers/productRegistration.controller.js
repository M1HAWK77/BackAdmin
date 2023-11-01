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
exports.newProductRegistration = exports.getProductRegistrationById = exports.getProductRegistration = void 0;
const productRegistration_models_1 = require("../models/productRegistration.models");
const detailProductRegistration_models_1 = require("../models/detailProductRegistration.models");
const manage_error_1 = require("../error/manage.error");
//@getProductRegistration: return all products from the database
const getProductRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headerListRegistration = yield productRegistration_models_1.ProductRegistration.findAll();
        const DetailListRegistration = yield detailProductRegistration_models_1.DetailRegistration.findAll();
        res.json({
            headerListRegistration,
            DetailListRegistration
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getProductRegistration = getProductRegistration;
const getProductRegistrationById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registrationId = req.params.id;
        const findRegister = yield productRegistration_models_1.ProductRegistration.findOne({ where: { idReg: registrationId } });
        if (!findRegister) {
            return res.status(404).json({
                msg: manage_error_1.ErrorMessages.PRO_NOT_FOUND
            });
        }
        res.json(findRegister);
    }
    catch (error) {
        res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.getProductRegistrationById = getProductRegistrationById;
const newProductRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { idProduct, idCatBelong, productName, productPrice, stock, available } = req.body;
    const productExist = yield productRegistration_models_1.ProductRegistration.findOne({ where: { idProduct: idProduct } });
    if (productExist) {
        return res.status(409).json({
            msg: manage_error_1.ErrorMessages.PRO_EXIST
        });
    }
    try {
        yield productRegistration_models_1.ProductRegistration.create({
            idProduct: idProduct,
            idCatBelong: idCatBelong,
            productName: productName,
            productPrice: productPrice,
            stock: stock,
            available: available
        });
        res.json({
            msg: `The product ${productName} was created succesfully`,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: manage_error_1.ErrorMessages.SERVER_ERROR,
            error
        });
    }
});
exports.newProductRegistration = newProductRegistration;
/*Terminar este apartado


export const updateProduct= async(req: Request, res: Response) =>{
    const registrationId= req.params.id;
    const {idPRegisterelong, productName, productPrice, stock, available} = req.body;

    const productExist: any= await ProductRegistration.findOne({where: {idProduct:registrationId}});
    if(!registrationId){
        res.status(404).json({
            msg: ErrorMessages.PRO_NOT_FOUND
        })
    }

    try {
        await ProductRegistration.update(
            {
                idProductBelong:idProductBelong,
                productName: productName,
                productPrice: productPrice,
                stock: stock,
                available: available
            },
            {where:{idProduct: registrationId}}Register  )

        res.json({
            msg: `The Product ${productExist.productName} was edited succefully`
        })
    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

export const deleteProduct = async (req: Request, res: Response) => {

    const idProduct = req.params.id;
    const existProduct:any = await ProductRegistration.findOne({ where: { idProduct: idProduct } });


    if (!existProduct) {
        return res.status(404).json({
            msg: ErrorMessages.PRO_NOT_FOUND
        });
    }

    try {

        await ProductRegistration.destroy(
            {where:{idProduct:idProduct}}
        );

        res.json({
                msg: `The Product ${existProductRegistration.productName} was deleted succefully`
            });


    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}*/ 
