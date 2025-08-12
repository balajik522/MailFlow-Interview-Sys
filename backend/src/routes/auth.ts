import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { readData, writeData } from '../utils/fileHandler';
import path from 'path';

const router = Router();
const usersPath = path.join(__dirname, '../../data/users.json');
const SECRET = 'secret123';

router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  const users = readData(usersPath);
  if (users.find((u: any) => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hashed = bcrypt.hashSync(password, 10);
  const newUser = { id: Date.now(), email, password: hashed, name };
  users.push(newUser);
  writeData(usersPath, users);
  res.json({ message: 'Registered successfully' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const users = readData(usersPath);
  const user = users.find((u: any) => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1d' });
  res.json({ token });
});

export default router;
