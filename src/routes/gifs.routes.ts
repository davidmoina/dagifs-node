import { Router } from 'express';
import {
  addGif,
  deleteGif,
  editGif,
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
  .post('/', addGif)
  .patch('/:id', editGif)
  .delete('/:id', deleteGif);

export default gifsRouter;
