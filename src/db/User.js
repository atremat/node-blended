/*
Створіть модель користувача User з такими полями:
name - string, required
email - string, email, unique, required
password - string, required

*/

import { Schema, model } from 'mongoose';

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
  },
);

export const User = model('user', userSchema);
