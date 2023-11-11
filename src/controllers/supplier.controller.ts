import { Request, Response } from 'express';
import { Supplier } from '../models/supplier.models';
import { ErrorMessages } from '../error/manage.error';

export const getSuppliers = async (req: Request, res: Response) => {
    try {
        const suppliersList = await Supplier.findAll();
        res.json({
            suppliersList
        })

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR
        })
    }
}

//URL example http://localhost:3001/api/suppliers/F001
export const getSupplierById = async (req: Request, res: Response) => {

    try {
        const idSupplier = req.params.id;
        const findSupplier = await Supplier.findOne({ where: { idSup: idSupplier } });
        if (!findSupplier) {
            return res.status(404).json({
                msg: ErrorMessages.SUP_NOT_FOUND
            })
        }
        res.json(findSupplier);

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

export const newSupplier = async (req: Request, res: Response) => {
    const { idSup, nameSup, phoneSup, addressSup, emailSup } = req.body;
    const existSupplier = await Supplier.findOne({ where: { idSup: idSup } });

    if (existSupplier) {
        return res.status(409).json({
            msg: ErrorMessages.SUP_EXIST
        });
    }

    try {
        await Supplier.create({
            idSup: idSup,
            nameSup: nameSup,
            phoneSup: phoneSup,
            addressSup: addressSup,
            emailSup: emailSup
        });

        res.json({
            msg: `El proveedor ${nameSup} se creo satisfactoriamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

/*Best practice
    send on the url the key of the object to edit
    body: the values to edit
*/
//URL example http://localhost:3001/api/suppliers/F001
export const updateSupplier = async (req: Request, res: Response) => {

    const idSup = req.params.id;
    const { nameSup, phoneSup, addressSup, emailSup } = req.body;

    const existSupplier:any = await Supplier.findOne({ where: { idSup: idSup } });

    if (!existSupplier) {
        return res.status(404).json({
            msg: ErrorMessages.SUP_NOT_FOUND
        });
    }

    try {
        await Supplier.update(
            {
                nameSup: nameSup,
                phoneSup: phoneSup,
                addressSup: addressSup,
                emailSup: emailSup
            }, 
            {where:{idSup:idSup}}
        );

        res.json({
                msg: `El proveedor ${existSupplier.nameSup} ha sido editado satisfactoriamente`
            });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

export const deleteSupplier = async (req: Request, res: Response) => {

    const idSup = req.params.id;
    const existSupplier:any = await Supplier.findOne({ where: { idSup: idSup } });


    if (!existSupplier) {
        return res.status(404).json({
            msg: ErrorMessages.SUP_NOT_FOUND
        });
    }

    try {

        await Supplier.destroy(
            {where:{idSup:idSup}}
        );

        res.json({
                msg: `El proveedor ${existSupplier.nameSup} ha sido removido satisfactoriamente`
            });

    } catch (error) {
        return res.status(500).json({
            msg: ErrorMessages.SERVER_ERROR,
            error
        })
    }
}

