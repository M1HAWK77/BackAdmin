import {Router} from 'express';
import {deleteCategory, getCategories, getCategoryById, newCategory, updateCategory } from '../controllers/category.controller';
import validateToken from './validateToken.routes';

const router= Router();

router.get('/', validateToken, getCategories);
router.post('/', validateToken, newCategory);
router.get('/:id', validateToken, getCategoryById);
router.put('/:id', validateToken, updateCategory);
router.delete('/:id', validateToken, deleteCategory);

export default router;