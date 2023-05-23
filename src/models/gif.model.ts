import { Schema, model } from 'mongoose';
import { Gif } from '../interfaces/gif';

const GifSchema = new Schema<Gif>({
  title: String,
  description: String,
  image_url: String,
  username: String,
  views: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User', default: null }
});

const GifModel = model('Gif', GifSchema);

export default GifModel;
