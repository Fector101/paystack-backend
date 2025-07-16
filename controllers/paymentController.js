const fetch = require('node-fetch');

const initializePayment = async (req, res) => {
  const { email, amount } = req.body;
console.log("email-->", email, amount)
  try {
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, amount: amount * 100 }),
    });

    const data = await response.json();
    
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Initialization failed' });
  }
};

const verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Verification failed' });
  }
};

module.exports = { initializePayment, verifyPayment };
