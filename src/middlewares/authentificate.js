import createHttpError from 'http-errors';
import { Session } from '../db/Session.js';
import { User } from '../db/User.js';

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

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  if (Date.now() > session.accessTokenValidUntil) {
    next(createHttpError(401, 'Session token expired'));
    return;
  }

  const user = await User.findById(session.userId);

  if (!user) {
    next(createHttpError(401, 'Unathorized'));
    return;
  }

  req.user = user;
  next();
};
