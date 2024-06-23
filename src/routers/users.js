import express, { Router } from 'express';
import { loginValidationSchema, registerValidationSchema } from '../users.js';
import { validateBody } from '../utils/validateBody.js';
import {
  loginController,
  refreshController,
  registerController,
} from '../controllers/users.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerValidationSchema),
  ctrlWrapper(registerController),
);

router.post(
  '/login',
  validateBody(loginValidationSchema),
  ctrlWrapper(loginController),
);

router.post('/refresh', ctrlWrapper(refreshController));

export default router;
