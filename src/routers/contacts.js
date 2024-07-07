import { Router } from 'express';
import { authentificate } from '../middlewares/authentificate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getContactsController } from '../controllers/contacts.js';

const router = Router();

router.get('/', authentificate, ctrlWrapper(getContactsController));

export default router;
