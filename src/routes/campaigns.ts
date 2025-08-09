import { Router } from 'express';
import { readData, writeData } from '../utils/fileHandler';
import path from 'path';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

const router = Router();
const campaignsPath = path.join(__dirname, '../../data/campaigns.json');
const contactsPath = path.join(__dirname, '../../data/contacts.json');

router.get('/', (req, res) => {
  const campaigns = readData(campaignsPath);
  res.json(campaigns);
});

router.post('/', (req, res) => {
  const { userId, name, subject, content } = req.body;
  const campaigns = readData(campaignsPath);
  const newCampaign = { id: Date.now(), userId, name, subject, content, status: 'draft' };
  campaigns.push(newCampaign);
  writeData(campaignsPath, campaigns);
  res.json(newCampaign);
});

router.post('/:id/send', async (req, res) => {
  const campaigns = readData(campaignsPath);
  const contacts = readData(contactsPath);
console.log(req.params.id,campaigns)
  const campaign = campaigns.find((c: any) => c.id == req.params.id);
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' });

  const userContacts = contacts.filter((contact: any) => contact.userId === campaign.userId);
  console.log("aa",process.env.SENDGRID_API_KEY)
  if (!process.env.SENDGRID_API_KEY) {
    return res.status(500).json({ message: 'SendGrid API key not configured' });
  }

  try {
    for (const contact of userContacts) {
      await sgMail.send({
        to: contact.email,
        from: process.env.SENDGRID_FROM_EMAIL || 'noreply@example.com',
        subject: campaign.subject,
        text: campaign.content,
        html: `<p>${campaign.content}</p>`
      });
    }

    campaign.status = 'sent';
    writeData(campaignsPath, campaigns);

    res.json({ message: 'Emails sent successfully', sentTo: userContacts.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending emails', error });
  }
});

export default router;