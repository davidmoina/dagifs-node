import { PaginateModel, Schema, model } from 'mongoose';
import { Gif, IGifPaginate } from '../interfaces/gif';
import paginate from 'mongoose-paginate-v2';

const GifSchema = new Schema<Gif>(
  {
    title: { type: String, required: true },
    description: { type: String, default: null },
    image_url: { type: String, required: true },
    username: { type: String, default: null },
    views: { type: Number, default: 0 },
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    source: { type: String, default: '' },
    giphyId: { type: String, default: null },
    tags: [String]
  },
  {
    timestamps: true
  }
);

GifSchema.plugin(paginate);

const GifModel = model<IGifPaginate, PaginateModel<IGifPaginate>>(
  'Gif',
  GifSchema
);

export default GifModel;
