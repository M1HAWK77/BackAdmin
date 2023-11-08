import {Router} from 'express';
import { deleteSupplier, getSupplierById, getSuppliers, newSupplier, updateSupplier } from '../controllers/supplier.controller';
import validateToken from './validateToken.routes';

const router= Router();
router.get('/',validateToken, getSuppliers);
router.post('/',validateToken, newSupplier);
router.get('/:id',validateToken, getSupplierById);
router.put('/:id',validateToken, updateSupplier);
router.delete('/:id',validateToken, deleteSupplier);

export default router;
