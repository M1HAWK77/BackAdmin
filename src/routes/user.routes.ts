import {Router} from 'express';
import { deleteUser, getUsers, loginUser, newUser, updateUser } from '../controllers/user.controller';
import validateToken from './validateToken.routes';

const router= Router();
router.post('/',validateToken ,newUser);
router.get('/',validateToken, getUsers);
router.post('/userLogin', loginUser);
router.delete('/:id',validateToken, deleteUser);
router.put('/:id',validateToken, updateUser);

export default router;