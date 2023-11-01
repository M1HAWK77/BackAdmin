import {Router} from 'express';
import { deleteSupplier, getSupplierById, getSuppliers, newSupplier, updateSupplier } from '../controllers/supplier.controller';

const router= Router();
router.get('/', getSuppliers);
router.post('/', newSupplier);
router.get('/:id', getSupplierById);
router.put('/:id', updateSupplier);
router.delete('/:id', deleteSupplier);

export default router;
