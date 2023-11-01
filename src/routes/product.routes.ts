//@Router: help us to manage our api routes
import {Router} from 'express';
import { deleteProduct, getProductById, getProducts, newProduct, updateProduct } from '../controllers/product.controller';

const router= Router();
//routes
router.get('/', getProducts);
router.post('/', newProduct);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

//export generated routes
export default router;