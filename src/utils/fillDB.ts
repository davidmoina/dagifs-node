import axios from 'axios';
import { Gifs } from '../interfaces/giphy';
import GifModel from '../models/gif.model';
import { Gif } from '../interfaces/gif';
import { randomItems } from './randomItems';

const tags = [
  'sports',
  'animated',
  'entertainment',
  'movie',
  'artists',
  'food',
  'anime',
  'animals',
  'meme',
  'cartoons',
  'emotions',
  'gaming',
  'reactions',
  'clips',
  'love',
  'heroes',
  'tvShows'
];

export const fillDatabase = async () => {
  const url = process.env.GIPHY_GIFS_URL!;
  // const tagsArr = 'tvShows';
  // const url = `https://api.giphy.com/v1/gifs/search?api_key=MgZWAj6KFicDVkYRZMJUAJOG9yImDTAu&q=${tagsArr}&limit=25&offset=0&rating=g&lang=en`;

  try {
    const response = await axios.get<Gifs>(url);

    response.data.data.map((item) => {
      const gif: Gif = {
        title: item.title,
        image_url: item.images.original.url,
        source: item.source,
        username: 'dagifs',
        giphyId: item.id,
        user: '646cd44a887b92cc1d7056fe',
        tags: randomItems(tags)
      };

      addIntoDB(gif);
      return;
    });
  } catch (error) {
    console.log(error);
  }
};

const addIntoDB = async (data: Gif) => {
  try {
    const gifExists = await GifModel.findOne({ giphyId: data.giphyId });

    if (gifExists) {
      return console.log('Gif exists');
    }

    const gif = await GifModel.create(data);

    console.log(`gif ${gif.title} added`);
  } catch (error) {
    console.log(error);
  }
};
