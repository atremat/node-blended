import createHttpError from 'http-errors';
import {
  createUser,
  deleteToken,
  findUserByEmail,
  updateUserWithToken,
} from '../services/users.js';
import bcrypt from 'bcrypt';

export const registerController = async (req, res, next) => {
  const user = findUserByEmail(req.body.email);

  if (user) {
    createHttpError(409, 'User with this email already exist!');
  }

  const newUser = await createUser(req.body);

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
    },
    token: newUser.token,
  });
};

export const loginController = async (req, res, next) => {
  const user = await findUserByEmail(req.body.email);

  if (!user) {
    createHttpError(401, 'Unauthorized');
  }

  console.log('req.body.password ', req.body.password);
  console.log('user.password ', user.password);

  const isEqual = await bcrypt.compare(req.body.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  const updUser = await updateUserWithToken(user._id);

  res.status(200).json({
    user: {
      name: updUser.name,
      email: updUser.email,
    },
    token: updUser.token,
  });
};

export const refreshController = async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    name: user.name,
    email: user.email,
  });
};

export const logoutController = async (req, res) => {
  const user = req.user;

  await deleteToken(user._id);

  res.sendStatus(204);
};
