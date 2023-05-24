import { Router } from 'express';
import {
  addGif,
  getAllGifs,
  getFilteredGifs,
  getOneGif,
  getPaginatedGifs,
  getSearchResults,
  getUserGifs
} from '../controllers/gif.controller';

const gifsRouter = Router();

gifsRouter
  .get('/', getAllGifs)
  .get('/search', getSearchResults)
  .get('/user/:userId', getUserGifs)
  .get('/filter/:tag', getFilteredGifs)
  .get('/paginate', getPaginatedGifs)
  .get('/:id', getOneGif)
  .post('/', addGif);

export default gifsRouter;
