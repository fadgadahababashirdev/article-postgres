require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/authRoute');
const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`app is running on http://localhost:${process.env.PORT}`)
);
app.get('/', (req, res) => res.send('App running successfully'));
app.use('/', authRouter);
app.get('*', (req, res) => {
  res.status(404).json({ status: 'Failed', message: 'route not found ' });
});
