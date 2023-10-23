//@Router: help us to manage our api routes
import {Router} from 'express';
import { getProducts, newProduct } from '../controllers/product.controller';

const router= Router();
//routes
router.get('/', getProducts);
router.post('/', newProduct);

//export generated routes
export default router;