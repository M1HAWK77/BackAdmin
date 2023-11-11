import { Request, Response } from 'express';
import { ProductRegistration } from '../models/productRegistration.models';
import { DetailRegistration } from '../models/detailProductRegistration.models';
import { ErrorMessages } from '../error/manage.error';
import { Product } from '../models/product.models';

//@getProductRegistration: return all products from the database
export const getProductRegistration = async (req: Request, res: Response) => {
    try {
        const headerListRegistration = await ProductRegistration.findAll();
        const detailListRegistration = await DetailRegistration.findAll({order:['idRegistrationBelong']});

        res.json({
            headerListRegistration,
            detailListRegistration
        });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

export const getProductRegistrationById = async (req: Request, res: Response) => {
    try {
        const registrationId = req.params.id;
        const findRegister = await ProductRegistration.findOne({ where: { idReg: registrationId } })
        if (!findRegister) {
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

export const newProductRegistration = async (req: Request, res: Response) => {
    const { dniUserReceive, idSup, totalProduct, totalCost, products } = req.body;
    
    // calculate totalProductEstimated y totalCostEstimated
    let totalProductEstimated = 0;
    let totalCostEstimated = 0;

    for (let product of products) {
        //find the value of the product
        let productId=product.idProductBelong;
        let findProduct= await Product.findOne({where:{idProduct:productId}})

        totalProductEstimated += Number(product.productQty);
        totalCostEstimated += Number(findProduct?.getDataValue('productPrice')) * Number(product.productQty);
        //Impresiones ver que pasa
        console.log(findProduct?.getDataValue('stock'));
        console.log(product.productQty)
        console.log(Number(findProduct?.getDataValue('stock')) + Number(product.productQty))

        //update the quantity of products in my table Products
        findProduct?.setDataValue('stock', Number(findProduct.getDataValue('stock')) + Number(product.productQty))
        await findProduct?.save()
    }


    try {
        //This method return an instance of the created object,
        //so im gonna catch it to show in the message
        //admissionDate: Date.now().toLocaleString(),
        let newRegister = await ProductRegistration.create({
            dniUserReceive: dniUserReceive,
            idSup: idSup,
            admissionDate: new Date().toLocaleString(),
            totalProducts: totalProductEstimated,
            totalCost: totalCostEstimated
        })

        for (let product of products) {
            product.idReg = newRegister.getDataValue('idReg');
            await DetailRegistration.create({
                idRegistrationBelong: product.idReg,
                idProductBelong: product.idProductBelong,
                productQty: product.productQty
            })

        }

        res.json({
            msg: `El registro ${newRegister.getDataValue('idReg')} se creo satisfactoriamente con ${products.length} productos`,
        });


    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}