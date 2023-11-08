import {Router} from 'express';
import { getProductRegistration, newProductRegistration } from '../controllers/productRegistration.controller';
import validateToken from './validateToken.routes';

const router= Router();

router.get('/', validateToken, getProductRegistration);
router.post('/', validateToken, newProductRegistration);

export default router;