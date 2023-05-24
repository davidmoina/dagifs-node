import { Router } from 'express';
import {
  addGif,
  getAllGifs,
  getFilteredGifs,
  getPaginatedGifs,
  getSearchResults,
  getUserGifs
} from '../controllers/gif.controller';

const gifsRouter = Router();

gifsRouter
  .get('/', getAllGifs)
  .get('/user/:userId', getUserGifs)
  .get('/filter/:tag', getFilteredGifs)
  .get('/paginate', getPaginatedGifs)
  .get('/search', getSearchResults)
  .post('/', addGif);

export default gifsRouter;
