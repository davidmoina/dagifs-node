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
