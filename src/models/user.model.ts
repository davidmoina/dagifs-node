import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user';

const UserSchema = new Schema<User>({
  display_name: String,
  username: String,
  email: String,
  avatar_url: String,
  rol: String
});

const UserModel = model('User', UserSchema);

export default UserModel;
