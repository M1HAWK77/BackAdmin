import {Router} from 'express';
import { deleteUser, getUsers, loginUser, newUser, updateUser } from '../controllers/user.controller';
import validateToken from './validateToken.routes';

const router= Router();
//router.post('/',validateToken ,newUser);
//router.get('/',validateToken, getUsers);
//router.delete('/:id',validateToken, deleteUser);
//router.put('/:id',validateToken, updateUser);
router.post('/' ,newUser);
router.get('/', getUsers);
router.post('/userLogin', loginUser);
router.delete('/:id', deleteUser);
router.put('/:id', updateUser);

export default router;