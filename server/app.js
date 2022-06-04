const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ msg: 'Hello World' });
});

const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
