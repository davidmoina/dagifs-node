import { Request, Response } from 'express';
import GifModel from '../models/gif.model';
import { ImageRequest } from '../interfaces/files';
import { uploadImage } from '../utils/cloudinaryUpload';
import fs from 'fs-extra';

export const getAllGifs = async (_req: Request, res: Response) => {
  try {
    const data = await GifModel.find({}).lean().exec();
    res.status(200).send({ status: true, data: data });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const addGif = async (req: Request, res: Response) => {
  const files = req.files as { image?: ImageRequest };

  const { title, description, image_url, source } = req.body;

  try {
    if (files) {
      if (!files.image) throw new Error('No image linked');

      const { secure_url } = await uploadImage(files.image.tempFilePath);
      await fs.unlink(files.image.tempFilePath);

      const newGif = await GifModel.create({
        title,
        description,
        image_url: secure_url,
        username: 'dagifs',
        source
      });

      res.status(200).send(newGif);
    } else {
      const newGif = await GifModel.create({
        title,
        description,
        image_url,
        username: 'dagifs',
        source
      });
      res.status(200).send(newGif);
    }
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
