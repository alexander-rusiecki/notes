const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const stytchConnection = require('./db/stytchConnection');
require('dotenv').config();

const app = express();
const client = stytchConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' });
});

app.post('/send-email', async (req, res) => {
  try {
    const { email } = req.body;
    const params = { email };
    const response = await client.otps.email.loginOrCreate(params);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});

app.post('/verify-otp', async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
