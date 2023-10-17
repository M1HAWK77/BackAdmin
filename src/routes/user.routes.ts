import {Router} from 'express';
import { loginUser, newUser } from '../controllers/user.controller';

const router= Router();
router.post('/', newUser);
router.post('/userLogin', loginUser);

export default router;