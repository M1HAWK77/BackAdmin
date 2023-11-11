import { Request, Response } from 'express';
import { Product } from '../models/product.models';
import { ErrorMessages } from '../error/manage.error';


//@getProducts: return all products from the database
export const getProducts = async (req: Request, res: Response) => {

    try {
        const productsList = await Product.findAll();
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


export const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const findProduct = await Product.findOne({ where: { idProduct: productId } })

        if (!findProduct) {
            return res.status(404).json({
                msg: ErrorMessages.PRO_NOT_FOUND
            })
        }

        res.json(findProduct);

    } catch (error) {
        res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }

}

export const newProduct = async (req: Request, res: Response) => {
    const { idProduct, idCatBelong, productName, productPrice, stock, available } = req.body;
    const productExist = await Product.findOne({ where: { idProduct: idProduct } })

    if (productExist) {
        return res.status(409).json({
            msg: ErrorMessages.PRO_EXIST
        })
    }

    try {

        await Product.create({
            idProduct: idProduct,
            idCatBelong: idCatBelong,
            productName: productName,
            productPrice: productPrice,
            stock: stock,
            available: available
        })

        res.json({
            msg: `El producto ${productName} ha sido creado satisfactoriamente`,
        });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const productId = req.params.id;
    const { idProductBelong, productName, productPrice, stock, available } = req.body;

    const productExist: any = await Product.findOne({ where: { idProduct: productId } });
    if (!productExist) {
        res.status(404).json({
            msg: ErrorMessages.PRO_NOT_FOUND
        })
    }

    try {
            await Product.update(
                {
                    idProductBelong: idProductBelong,
                    productName: productName,
                    productPrice: productPrice,
                    stock: stock,
                    available: stock === 0 ? false : available
                },
                { where: { idProduct: productId } }
            )

        res.json({
            msg: `El producto ${productExist.productName} ha sido editado satisfactoriamente`
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
    const existProduct: any = await Product.findOne({ where: { idProduct: idProduct } });


    if (!existProduct) {
        return res.status(404).json({
            msg: ErrorMessages.PRO_NOT_FOUND
        });
    }

    try {

        await Product.destroy(
            { where: { idProduct: idProduct } }
        );

        res.json({
            msg: `El Producto ${existProduct.productName} ha sido eliminado satisfactoriamente`
        });


    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}