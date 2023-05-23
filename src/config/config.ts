import dotenv from 'dotenv';
import { Config } from '../interfaces/config';
dotenv.config();

const CONFIG: Config = {
  development: {
    app: {
      PORT: Number(process.env.PORT) || 4000
    },
    db: {
      URI: process.env.MONGODB_URI || 'http://localhost:27017'
    },
    cloudinary: {
      CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
      API_KEY: process.env.CLOUDINARY_API_KEY,
      API_SECRET: process.env.CLOUDINARY_API_SECRET
    }
  }
};

export default CONFIG.development;
