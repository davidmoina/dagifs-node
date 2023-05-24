import mongoose from 'mongoose';

export interface Gif {
  title: string;
  description?: string;
  image_url: string;
  username: string;
  views?: number;
  user?: string;
  source: string;
  giphyId?: string;
  tags?: string[];
}

export interface IGifPaginate extends mongoose.Document {
  title: string;
  description?: string;
  image_url: string;
  username: string;
  views?: number;
  user?: string;
  source: string;
  giphyId?: string;
  tags?: string[];
}
