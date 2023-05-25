import { Request, Response } from 'express';
import GifModel from '../models/gif.model';
import { ImageRequest } from '../interfaces/files';
import { uploadImage } from '../utils/cloudinaryUpload';
import fs from 'fs-extra';
import UserModel from '../models/user.model';

interface RequestParams {}

interface ResponseBody {}

interface RequestBody {}

interface RequestQuery {
  page: string;
}

export const getAllGifs = async (_req: Request, res: Response) => {
  try {
    const data = await GifModel.find({}).lean().exec();
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getPaginatedGifs = async (
  req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
  res: Response
) => {
  const page = req.query.page;

  try {
    const data = await GifModel.paginate({}, { limit: 20, page: +page });

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getFilteredGifs = async (req: Request, res: Response) => {
  const { tag } = req.params;

  try {
    const data = await GifModel.find({ tags: tag }).lean().exec();
    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getUserGifs = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const data = await GifModel.find({ user: userId }).lean().exec();
    const userFavorites = await UserModel.findById(userId, { favorites: 1 })
      .populate('favorites')
      .lean()
      .exec();

    res.status(200).send({ data: data, favorites: userFavorites?.favorites });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const addGif = async (req: Request, res: Response) => {
  const files = req.files as { image?: ImageRequest };

  const { title, description, image_url, source, username, user, tags } =
    req.body;

  try {
    if (files) {
      if (!files.image) throw new Error('No image linked');

      const { secure_url } = await uploadImage(files.image.tempFilePath);
      await fs.unlink(files.image.tempFilePath);

      const newGif = await GifModel.create({
        title,
        description,
        image_url: secure_url,
        username,
        source,
        user,
        tags: tags ? tags.split(',') : null
      });

      res.status(200).send(newGif);
    } else {
      const newGif = await GifModel.create({
        title,
        description,
        image_url,
        username,
        source,
        user,
        tags: tags ? tags.split(',') : null
      });
      res.status(200).send(newGif);
    }
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getSearchResults = async (req: Request, res: Response) => {
  const text = req.query.text;

  try {
    const gifs = await GifModel.find({
      title: { $regex: text, $options: 'i' }
    })
      .lean()
      .exec();

    res.status(200).send(gifs);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const getOneGif = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const data = await GifModel.findById(id).populate('user').lean().exec();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const editGif = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { title, description, source, tags } = req.body;

  try {
    const editedGif = await GifModel.findByIdAndUpdate(id, {
      title,
      description,
      source,
      tags: tags ? tags.split(',') : null
    });
    res.status(200).send(`Edited gif:  ${editedGif?.title} `);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deleteGif = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const editedGif = await GifModel.findByIdAndDelete(id);
    res.status(200).send(`Deleted gif:  ${editedGif?.title} `);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};
