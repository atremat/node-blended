import createHttpError from 'http-errors';
import { User } from '../db/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { env } from '../utils/env.js';

export const findUserByEmail = (email) => User.findOne({ email });

export const updateUserWithToken = (id) => {
  const updatedToken = jwt.sign({ id }, env('SECRET'));

  return User.findByIdAndUpdate(id, { token: updatedToken }, { new: true });
};

export const createUser = async ({ name, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return updateUserWithToken(newUser._id);
};

export const deleteToken = (id) => User.findByIdAndUpdate(id, { token: '' });
