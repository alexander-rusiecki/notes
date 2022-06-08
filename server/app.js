const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const notesRoutes = require('./routes/notesRoutes');
const verifyToken = require('./middleware/verifyToken');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/notes', verifyToken, notesRoutes);

const PORT = process.env.PORT || 6000;

app.listen(PORT, () =>
  console.log(`Server listening on http://localhost:${PORT}`)
);
