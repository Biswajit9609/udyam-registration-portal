import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'

const app = express();
const prisma = new PrismaClient();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());


app.post('/api/submit', async (req, res) => {
  try {
    const formData = req.body;
    console.log('Received form data:', formData);


    const newSubmission = await prisma.submission.create({
      data: {
        aadhaarNumber: formData['ctl00_ContentPlaceHolder1_txtadharno'],
        entrepreneurName: formData['ctl00_ContentPlaceHolder1_txtownername'],
        organisationType: formData['ctl00_ContentPlaceHolder1_ddlTypeofOrg'],
        panNumber: formData['ctl00_ContentPlaceHolder1_txtPan'],
      },
    });

    res.status(201).json(newSubmission);

  } catch (error) {
    console.error('Error saving submission:', error);
    res.status(500).json({ error: 'Failed to submit form data. Please check if the Aadhaar or PAN is already registered.' });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
