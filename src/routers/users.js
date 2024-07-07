import express, { Router } from 'express';
import {
  loginValidationSchema,
  registerValidationSchema,
} from '../validation/users.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { authentificate } from '../middlewares/authentificate.js';

const router = Router();

router.post(
  '/signup',
  validateBody(registerValidationSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  validateBody(loginValidationSchema),
  ctrlWrapper(loginController),
);

router.post('/logout', authentificate, ctrlWrapper(logoutController));

router.get('/current', authentificate, ctrlWrapper(refreshController));

export default router;
