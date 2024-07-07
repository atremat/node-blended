import { getContacts } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  const userId = req.user._id;
  const contacts = await getContacts(userId);

  res.status(200).json(contacts);
};
