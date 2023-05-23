import axios from 'axios';
import { Gifs } from '../interfaces/giphy';
import GifModel from '../models/gif.model';
import { Gif } from '../interfaces/gif';

export const fillDatabase = async () => {
  const url = process.env.GIPHY_GIFS_URL!;

  try {
    const response = await axios.get<Gifs>(url, {
      headers: {
        Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`
      }
    });

    response.data.data.map((item) => {
      const gif: Gif = {
        title: item.title,
        image_url: item.images.original.url,
        source: item.source,
        username: 'dagifs',
        giphyId: item.id,
        user: '646cd44a887b92cc1d7056fe'
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
