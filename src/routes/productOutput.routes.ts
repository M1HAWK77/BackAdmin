import {Router} from 'express';
import { getProductsOutput } from '../controllers/productOutput.controller';

const router= Router();

router.get('/', getProductsOutput);
router.post('/');

export default router;