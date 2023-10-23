import {Request, Response} from 'express';
import { Category } from '../models/category.models';

export const getCategories= async (req: Request, res:Response) =>{

    const categoriesList= await Category.findAll();

    res.json({
        categoriesList
    })
}

export const createCategory=(req: Request, res:Response) =>{
    const {body}=req;

    res.json({
        msg:'Category created',
        body
    })

}