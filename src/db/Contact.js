import { Schema, model } from 'mongoose';

export const contactSchema = new Schema(
  {
    name: { type: String, required: true },
    number: { type: String, required: true },
    userId: { type: Schema.ObjectId },
  },
  {
    versionKey: false,
  },
);

export const ContactsModel = model('contact', contactSchema);
