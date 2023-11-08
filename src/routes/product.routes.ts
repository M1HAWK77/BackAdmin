//@Router: help us to manage our api routes
import {Router} from 'express';
import { deleteProduct, getProductById, getProducts, newProduct, updateProduct } from '../controllers/product.controller';
import validateToken from './validateToken.routes';

const router= Router();
//routes
router.get('/', validateToken, getProducts);
router.post('/', validateToken, newProduct);
router.get('/:id', validateToken, getProductById);
router.put('/:id', validateToken, updateProduct);
router.delete('/:id', validateToken, deleteProduct);

//export generated routes
export default router;