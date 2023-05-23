import { v2 as cloudinary } from 'cloudinary';
import config from '../config/config';
import { UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: config.cloudinary.CLOUD_NAME,
  api_key: config.cloudinary.API_KEY,
  api_secret: config.cloudinary.API_SECRET,
  secure: true
});

export const uploadImage = async (
  filePath: string
): Promise<UploadApiResponse> => {
  return await cloudinary.uploader.upload(filePath, {
    resource_type: 'image',
    folder: 'dagifs',
    overwrite: true
  });
};
