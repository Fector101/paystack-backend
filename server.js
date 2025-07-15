const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/initialize', async (req, res) => {
  const { email, amount } = req.body;
  
  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amount * 100, // Convert to kobo
      }),
    });
    
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error initializing payment:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

app.get('/api/verify/:reference', async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const result = await response.json();

    if (result.status && result.data.status === 'success') {
      res.status(200).json({ verified: true, data: result.data });
    } else {
      res.status(400).json({ verified: false, data: result.data });
    }
  } catch (error) {
    console.error('Verification failed:', error);
    res.status(500).json({ error: 'Server error during verification' });
  }
});

app.get('/', (req, res) => {
  res.send('Paystack backend is working!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
