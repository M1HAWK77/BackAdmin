import { Request, Response } from 'express';
import { ProductOutput } from '../models/productOutput.models';
import { ErrorMessages } from '../error/manage.error';
import { Product } from '../models/product.models';
import { DetailOutput } from '../models/detailProductOutput.models';


export const getProductsOutput = async (req: Request, res: Response) => {
    try {
        const headerListOutput = await ProductOutput.findAll();
        const detailListOutput = await DetailOutput.findAll({ order: ['idOutputBelong'] });
        res.json({
            headerListOutput,
            detailListOutput
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
        let productId = product.idProductBelong;
        let findProduct = await Product.findOne({ where: { idProduct: productId } })

        //control amount not greater than qty sent
        if (findProduct?.getDataValue('stock') < product.productQty) {
            return res.status(500).json({
                msg: `${ErrorMessages.MAX_AMOUNT}, 'existencias disponibles del producto ${findProduct?.getDataValue('productName')}: ${findProduct?.getDataValue('stock')}'`
            })
        }
        totalProductEstimated += Number(product.productQty);
        totalCostEstimated += (Number(findProduct?.getDataValue('productPrice')) * Number(product.productQty)) + ((Number(findProduct?.getDataValue('productPrice')) * Number(product.productQty)) * 0.09);
        //update the quantity of products in my table Products
        findProduct?.setDataValue('stock', Number(findProduct.getDataValue('stock')) - Number(product.productQty))
        //update available if the substraction is equal to 0
        if (findProduct?.getDataValue('stock') === 0) {
            findProduct?.setDataValue('available', false);
        }
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
            msg: `La salida ${newOutput.getDataValue('idOutput')} ha sido creada con exito ${products.length} productos`,
        });


    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}