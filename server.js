const express = require('express');
const connectDB = require('./config/db');
const cron = require('node-cron');
// const nightmare = require('nightmare');
const config = require('config');
const path = require('path');

const app = express();

const Tracker = require('./models/Tracker');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SendGridApiKey || config.get('SendGridApiKey'));

connectDB();

app.use(express.json({ extended: false }));

app.get('/api', (req, res) => res.send('api running'));

app.use('/api/tracker/', require('./routes/tracker'));

// Serve react in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));
