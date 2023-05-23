import { Schema, model } from 'mongoose';
import { Gif } from '../interfaces/gif';

const GifSchema = new Schema<Gif>({
  title: String,
  description: { type: String, default: null },
  image_url: String,
  username: { type: String, default: null },
  views: { type: Number, default: 0 },
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  source: { type: String, default: '' },
  giphyId: { type: String, default: null }
});

const GifModel = model('Gif', GifSchema);

export default GifModel;
