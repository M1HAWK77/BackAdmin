import {Router} from 'express';
import {deleteCategory, getCategories, getCategoryById, newCategory, updateCategory } from '../controllers/category.controller';

const router= Router();
router.get('/', getCategories);
router.post('/', newCategory);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;