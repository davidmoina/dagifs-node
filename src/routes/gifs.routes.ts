import { Router } from 'express';
import { addGif, getAllGifs } from '../controllers/gif.controller';

const gifsRouter = Router();

gifsRouter.get('/', getAllGifs);
gifsRouter.post('/', addGif);

export default gifsRouter;
