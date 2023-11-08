import {Router} from 'express';
import { getProductsOutput } from '../controllers/productOutput.controller';
import validateToken from './validateToken.routes';

const router= Router();

router.get('/',validateToken, getProductsOutput);
router.post('/',validateToken);

export default router;