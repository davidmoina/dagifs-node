import { Router } from 'express';
import {
  addFavoriteGif,
  createUser,
  getUser
} from '../controllers/user.controller';

const userRouter = Router();

userRouter
  .get('/:id', getUser)
  .post('/', createUser)
  .patch('/', addFavoriteGif);

export default userRouter;
