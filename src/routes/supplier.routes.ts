import {Router} from 'express';
import { getSuppliers, newSupplier } from '../controllers/supplier.controller';

const router= Router();
router.get('/', getSuppliers);
router.post('/', newSupplier);

export default router;
