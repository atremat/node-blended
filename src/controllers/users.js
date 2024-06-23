import { WEEK } from '../constants/index.js';
import { loginUser, refreshUser, registerUser } from '../services/users.js';

export const registerController = async (req, res, next) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    data: {
      name: user.name,
      email: user.email,
    },
  });
};

export const loginController = async (req, res, next) => {
  const session = await loginUser(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + WEEK),
  });

  res.cookie('sessionId', session.userId, {
    httpOnly: true,
    expires: new Date(Date.now() + WEEK),
  });

  res.status(200).json({
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshController = async (req, res, next) => {
  const session = await refreshUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + WEEK),
  });

  res.cookie('sessionId', session.userId, {
    httpOnly: true,
    expires: new Date(Date.now() + WEEK),
  });

  res.status(200).json({
    data: {
      accessToken: session.accessToken,
    },
  });
};
