import { Schema, model } from 'mongoose';
import { User } from '../interfaces/user';

const UserSchema = new Schema<User>(
  {
    display_name: { type: String, default: null },
    username: String,
    email: String,
    avatar_url: { type: String, default: null },
    rol: { type: String, default: null },
    password: String,
    favorites: [{ type: Schema.Types.ObjectId, default: null }]
  },
  {
    timestamps: true
  }
);

const UserModel = model('User', UserSchema);

export default UserModel;
