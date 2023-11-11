import {Request, Response} from 'express';
import { Category } from '../models/category.models';
import { ErrorMessages } from '../error/manage.error';

export const getCategories= async (req: Request, res:Response) =>{
    try {
        const categoriesList = await Category.findAll();
        res.json({
            categoriesList
        })

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR
        })
    }
}

export const getCategoryById= async(req: Request, res:Response) =>{
    try {
        const id = req.params.id;
        const findCategory = await Category.findOne({ where: { idCat: id } });
        if (!findCategory) {
            return res.status(404).json({
                msg: ErrorMessages.CAT_NOT_FOUND
            })
        }
        res.json(findCategory);

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

export const newCategory = async (req: Request, res: Response) => {
    const { idCat, nameCat, descriptionCat } = req.body;
    const existCategory = await Category.findOne({ where: { idCat: idCat } });

    if (existCategory) {
        return res.status(409).json({
            msg: ErrorMessages.CAT_EXIST
        });
    }

    try {
        await Category.create({
            idCat: idCat,
            nameCat: nameCat,
            descriptionCat: descriptionCat,
        });

        res.json({
            msg: `La Categoria ${nameCat} ha sido creada satisfactoriamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}


export const updateCategory = async (req: Request, res: Response) => {

    const idCat = req.params.id;
    const { nameCat, descriptionCat } = req.body;

    const existCategory:any = await Category.findOne({ where: { idCat: idCat } });

    if (!existCategory) {
        return res.status(404).json({
            msg: ErrorMessages.CAT_NOT_FOUND
        });
    }

    try {
        await Category.update(
            {
                nameCat: nameCat,
                descriptionCat: descriptionCat,
            }, 
            {where:{idCat:idCat}}
        );

        res.json({
                msg: `La Categoria ${existCategory.nameCat} ha sido editada satisfactoriamente`
            });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}


export const deleteCategory = async (req: Request, res: Response) => {

    const idCat = req.params.id;
    const existCategory:any = await Category.findOne({ where: { idCat: idCat } });


    if (!existCategory) {
        return res.status(404).json({
            msg: ErrorMessages.CAT_NOT_FOUND
        });
    }

    try {

        await Category.destroy(
            {where:{idCat:idCat}}
        );

        res.json({
                msg: `La Categoria ${existCategory.nameCat} ha sido eliminada satisfactoriamente`
            });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}
