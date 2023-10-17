import {Request, Response} from 'express';


//@getProducts: return all products from the database
export const getProducts= (req: Request, res:Response)=>{
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