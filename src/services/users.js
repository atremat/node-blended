import createHttpError from 'http-errors';
import { User } from '../db/User.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { Session } from '../db/Session.js';

export const registerUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (user) {
    throw createHttpError(409, 'User with this email already exist!');
  }

  const password = await bcrypt.hash(userData.password, 10);

  return User.create({ ...userData, password });
};

export const loginUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw createHttpError(401, 'Unauthorized');
  }

  const isEqual = await bcrypt.compare(userData.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  const userId = user._id;

  await Session.deleteOne({ userId });

  const session = Session.create({
    userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: Date.now() + 15 * 60 * 1000,
    refreshTokenValidUntil: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  return session;
};

export const refreshUser = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({ userId: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (Date.now() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Session expired');
  }

  await Session.deleteOne({ sessionId, refreshToken });

  const newSession = Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: Date.now() + 15 * 60 * 1000,
    refreshTokenValidUntil: Date.now() + 7 * 24 * 60 * 60 * 1000,
  });

  return newSession;
};
