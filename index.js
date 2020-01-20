const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const postRoute = require('./routes/post');

dotenv.config();

const db = process.env.DB_CONNECT;

mongoose.connect(db,
  { useNewUrlParser: true,
    useUnifiedTopology: true },
).then(
  () => { console.log('connected to DB') },
  err => { console.log(err) }
);

app.use(express.json());

app.use('/api/user', authRoutes);
app.use('/api/post', postRoute);

app.listen(5000, () =>
console.log('server running'));