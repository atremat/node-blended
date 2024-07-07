import { ContactsModel } from '../db/Contact.js';

export const getContacts = (userId) => ContactsModel.find({ userId });
