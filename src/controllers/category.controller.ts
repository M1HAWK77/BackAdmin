import {Request, Response} from 'express';

export const getCategories=(req: Request, res:Response) =>{
    res.json({
        msg:'All categories'
    })
}

export const createCategory=(req: Request, res:Response) =>{
    const {body}=req;

    res.json({
        msg:'Category created',
        body
    })

}