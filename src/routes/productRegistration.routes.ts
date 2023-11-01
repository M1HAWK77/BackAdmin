import {Router} from 'express';
import { getProductRegistration, newProductRegistration } from '../controllers/productRegistration.controller';

const router= Router();

router.get('/', getProductRegistration);
router.post('/', newProductRegistration);

export default router;