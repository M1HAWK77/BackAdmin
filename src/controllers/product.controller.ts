import {Request, Response} from 'express';
import { Product } from '../models/product.models';


//@getProducts: return all products from the database
export const getProducts= async (req: Request, res:Response)=>{

    const productsList= await Product.findAll();

    res.json({
        msg: "Get Products"
    });
}

export const newProduct= (req: Request, res:Response) =>{
    const {body}=req;

    res.json({
        msg: 'New Product',
        body
    });
}