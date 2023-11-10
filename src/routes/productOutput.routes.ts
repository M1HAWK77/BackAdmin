import {Router} from 'express';
import { getProductsOutput, newProductOutput } from '../controllers/productOutput.controller';
import validateToken from './validateToken.routes';

const router= Router();

router.get('/',validateToken, getProductsOutput);
router.post('/',validateToken, newProductOutput);

export default router;