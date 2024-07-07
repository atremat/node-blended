import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';

import { User } from '../db/User.js';
import { env } from '../utils/env.js';

export const authentificate = async (req, res, next) => {
  const header = req.get('Authorization');

  if (!header) {
    next(createHttpError(401, 'Unathorized'));
    return;
  }

  const [bearer, token] = header.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Unauthorized'));
    return;
  }

  const { id } = jwt.verify(token, env('SECRET'));

  const user = await User.findById(id);

  if (!user || !user.token || user.token !== token) {
    next(createHttpError(401, 'Unauthorized'));
  }

  req.user = user;
  next();
};
