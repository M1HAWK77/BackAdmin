import { Request, Response } from 'express';
import { ProductOutput } from '../models/productOutput.models';
import { ErrorMessages } from '../error/manage.error';


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