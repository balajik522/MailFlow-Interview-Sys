import { Router } from 'express';
import { readData } from '../utils/fileHandler';
import path from 'path';

const router = Router();
const campaignsPath = path.join(__dirname, '../../data/campaigns.json');
const contactsPath = path.join(__dirname, '../../data/contacts.json');

router.get('/dashboard', (req, res) => {
  const campaigns = readData(campaignsPath);
  const contacts = readData(contactsPath);
  const sentCount = campaigns.filter((c: any) => c.status === 'sent').length;
  res.json({
    totalCampaigns: campaigns.length,
    totalContacts: contacts.length,
    emailsSent: sentCount
  });
});

export default router;
