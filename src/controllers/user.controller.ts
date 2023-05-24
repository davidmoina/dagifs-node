import { Request, Response } from 'express';
import UserModel from '../models/user.model';

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await UserModel.create({
      username,
      email,
      password
    });

    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await UserModel.findById(id);

    res
      .status(200)
      .send({
        _id: user?._id,
        username: user?.username,
        display_name: user?.display_name,
        avatar_url: user?.avatar_url
      });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};
