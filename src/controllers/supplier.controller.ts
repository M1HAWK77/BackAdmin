import {Request, Response} from 'express';


export const getSuppliers= (req: Request, res:Response) =>{

    res.json({
        msg: 'Suppliers list'
    });
}

export const newSupplier= (req: Request, res:Response) =>{
    const {body}=req;

    res.json({
        msg: 'New Supplier',
        body
    });
}

