import { Request, Response } from 'express';
import { ProductOutput } from '../models/productOutput.models';
import { ErrorMessages } from '../error/manage.error';
import { Product } from '../models/product.models';
import { DetailOutput } from '../models/detailProductOutput.models';


export const getProductsOutput = async (req: Request, res: Response) => {
    try {
        const productsList = await ProductOutput.findAll();
        res.json({
            productsList
        });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

export const newProductOutput = async (req: Request, res: Response) => {
    const { dniUserOutput, products } = req.body;
    
    // calculate totalProductEstimated y totalCostEstimated
    let totalProductEstimated = 0;
    let totalCostEstimated = 0;

    for (let product of products) {
        //find the value of the product
        let productId=product.idProductBelong;
        let findProduct= await Product.findOne({where:{idProduct:productId}})

        totalProductEstimated += product.productQty;
        totalCostEstimated += findProduct?.getDataValue('productPrice') * product.productQty;
        //update the quantity of products in my table Products
        findProduct?.setDataValue('stock', findProduct.getDataValue('stock') - product.productQty)
        await findProduct?.save()
    }


    try {
        //This method return an instance of the created object,
        //so im gonna catch it to show in the message
        //admissionDate: Date.now().toLocaleString(),
        let newOutput = await ProductOutput.create({
            dniUserOutput: dniUserOutput,
            departureDate: new Date().toLocaleString(),
            totalProducts: totalProductEstimated,
            totalCost: totalCostEstimated
        })

        for (let product of products) {
            product.idOutput = newOutput.getDataValue('idOutput');
            await DetailOutput.create({
                idOutputBelong: product.idOutput,
                idProductBelong: product.idProductBelong,
                productQty: product.productQty
            })

        }

        res.json({
            msg: `The product ${newOutput.getDataValue('idReg')} was succesfully removed with ${products.length} products`,
        });


    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}