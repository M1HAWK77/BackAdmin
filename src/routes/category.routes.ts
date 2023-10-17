import {Router} from 'express';
import { createCategory, getCategories } from '../controllers/category.controller';

const router= Router();
router.get('/', getCategories);
router.post('/newCategory', createCategory);

export default router;