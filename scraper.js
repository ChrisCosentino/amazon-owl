const puppeteer = require('puppeteer');
const mongoose = require('mongoose');

function sayHello() {
  console.log('hello');
}

sayHello();

function scrapeProducts() {}
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
