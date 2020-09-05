const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

const Tracker = require('./models/Tracker');

// function sayHello() {
//   console.log('hello');
// }

// sayHello();

async function scrapeProducts() {
  const browserPromise = puppeteer.launch({
    headless: false,
    args: ['--no-sandbox'],
  });

  console.log('starting scheduler');
  await connectDB();
  const trackers = await Tracker.find();
  console.log(trackers);
  console.log('found');

  const browser = await browserPromise;
  const context = await browser.createIncognitoBrowserContext();

  trackers.forEach(async (tracker) => {
    console.log(tracker.price);

    const page = await context.newPage();

    //dont load css or anything else that would slow the page down
    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (
        ['image', 'stylesheet', 'font', 'script'].indexOf(
          request.resourceType()
        ) !== -1
      ) {
        request.abort();
      } else {
        request.continue();
      }
    });
    await page.goto(tracker.url, {
      waitUntil: 'domcontentloaded',
      timeout: 200000,
    });

    const product = await page.evaluate(() => {
      const priceString = document.getElementById('price_inside_buybox')
        .innerText;

      let priceNum = priceString.replace(/\D/g, '');

      var output = [
        priceNum.slice(0, priceNum.length - 2),
        '.',
        priceNum.slice(priceNum.length - 2),
      ].join('');

      const p = {
        price: parseFloat(output),
        title: document.getElementById('productTitle').innerText,
      };

      return p;
    });
    console.log(product);
    await page.close();
  });
}

scrapeProducts();

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
// }
