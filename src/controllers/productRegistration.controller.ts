import { Request, Response } from 'express';
import { ProductRegistration } from '../models/productRegistration.models';
import { DetailRegistration } from '../models/detailProductRegistration.models';
import { ErrorMessages } from '../error/manage.error';

//@getProductRegistration: return all products from the database
export const getProductRegistration = async (req: Request, res: Response) => {

    try {
        const headerListRegistration = await ProductRegistration.findAll();
        const DetailListRegistration = await DetailRegistration.findAll();

        res.json({
            headerListRegistration,
            DetailListRegistration
        });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }

}


export const getProductRegistrationById = async(req: Request, res:Response) =>{
    try {
        const registrationId= req.params.id;
        const findRegister= await ProductRegistration.findOne({where: {idReg: registrationId}})  
        if(!findRegister){
            return res.status(404).json({
                msg: ErrorMessages.PRO_NOT_FOUND
            })
        }

        res.json(findRegister);

    } catch (error) {
        res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })        
    }

}

export const newProductRegistration = async(req: Request, res: Response) => {
    const { idProduct, idCatBelong, productName, productPrice, stock, available } = req.body;
    const productExist= await ProductRegistration.findOne({where: {idProduct:idProduct}})

    if(productExist){
        return res.status(409).json({
            msg: ErrorMessages.PRO_EXIST
        })
    }

    try {

        await ProductRegistration.create({
            idProduct: idProduct,
            idCatBelong: idCatBelong,
            productName: productName,
            productPrice: productPrice,
            stock: stock,
            available: available
        })
        
            res.json({
                msg: `The product ${productName} was created succesfully`,
            });
        
    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error    
        })
    }
}

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