// Створіть модель сесії Session з такими полями:
// userId - string, required
// accessToken - string, required
// refreshToken - string, required
// accessTokenValidUntil - Date, required
// refreshTokenValidUntil - Date, required

import { Schema, model } from 'mongoose';

export const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      required: true,
    },

    accessToken: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },

    accessTokenValidUntil: {
      type: Date,
      required: true,
    },

    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  },
);

export const Session = model('session', sessionSchema);
