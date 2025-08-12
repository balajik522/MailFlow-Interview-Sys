import { Router } from 'express';
import { readData, writeData } from '../utils/fileHandler';
import path from 'path';

const router = Router();
const contactsPath = path.join(__dirname, '../../data/contacts.json');

router.get('/', (req, res) => {
  const contacts = readData(contactsPath);
  res.json(contacts);
});

router.post('/', (req, res) => {
  const { userId, email, name } = req.body;
  const contacts = readData(contactsPath);
  const newContact = { id: Date.now(), userId, email, name };
  contacts.push(newContact);
  writeData(contactsPath, contacts);
  res.json(newContact);
});

export default router;
