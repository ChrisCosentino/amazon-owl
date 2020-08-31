const express = require('express');
const connectDB = require('./config/db');
const cron = require('node-cron');
const nightmare = require('nightmare');
const config = require('config');
const path = require('path');

const app = express();

const Tracker = require('./models/Tracker');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.mongoURI);
// config.get('SendGridApiKey') ||

connectDB();

console.log('in the app');

app.use(express.json({ extended: false }));

app.get('/api', (req, res) => res.send('api running'));

app.use('/api/tracker/', require('./routes/tracker'));

// cron.schedule('*/1 * * * *', async () => {
//   console.log('started cron job');
//   const trackers = await Tracker.find();

//   console.log(trackers);
//   trackers.forEach(async (tracker) => {
//     console.log('price: ' + tracker.price);

//     const priceString = await nightmare()
//       .goto(tracker.url)
//       .wait('#price_inside_buybox')
//       .evaluate(() => document.getElementById('price_inside_buybox').innerText)
//       .end();

//     let priceNum = priceString.replace(/\D/g, '');

//     var output = [
//       priceNum.slice(0, priceNum.length - 2),
//       '.',
//       priceNum.slice(priceNum.length - 2),
//     ].join('');

//     const priceNumber = parseFloat(output);

//     if (priceNumber < tracker.price) {
//       console.log('price is less than the original');
//       sendEmail(
//         tracker.email,
//         'The Price is low',
//         `The price on ${tracker.url} has decreased since  $${priceNumber}`
//       );
//     } else if (priceNumber > tracker.price) {
//       console.log('price is greater than the original');
//       sendEmail(
//         tracker.email,
//         'The Price has increased',
//         `The price on ${tracker.url} has increased since  $${priceNumber}`
//       );
//     } else {
//       console.log('price hasnt changed');
//     }
//   });

//   console.log('running job every hour');
// });

function sendEmail(to, subject, body) {
  const email = {
    to: to,
    from: 'ccos2u@hotmail.com',
    subject: subject,
    text: body,
    html: body,
  };

  try {
    return sgMail.send(email);
  } catch (error) {
    console.log('error sending email');
  }
}

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
