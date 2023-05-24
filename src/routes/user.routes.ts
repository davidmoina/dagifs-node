import { Router } from 'express';
import { createUser, getUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('/:id', getUser).post('/', createUser);

export default userRouter;
