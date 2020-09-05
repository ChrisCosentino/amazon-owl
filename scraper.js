const puppeteer = require('puppeteer');
const connectDB = require('./config/db');
const config = require('config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SendGridApiKey || config.get('SendGridApiKey'));

const Tracker = require('./models/Tracker');

async function scrapeProducts() {
  const browserPromise = puppeteer.launch({
    headless: true,
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
    const product_url = tracker.url;
    const product_title = tracker.title;
    const product_price = tracker.price;
    const product_trackerId = tracker.trackerId;
    const product_cancelUrl = `https://amazon-owl.herokuapp.com/rm/${product_trackerId}`;

    if (product.price > tracker.price) {
      console.log('price is higher than what it used to be');
    } else if (product.price < tracker.price) {
      console.log('price is lower than before');
      sgMail.send({
        to: tracker.email,
        from: 'ccos2u@hotmail.com',
        subject: 'Price dropped',
        templateId: 'd-002654122d7540548017e5c884d8ce4a',
        dynamic_template_data: {
          product_price,
          product_title,
          product_url,
          product_cancelUrl,
        },
      });

      const t = await Tracker.findOne({ trackerId: tracker.trackerId });
      t.price = product.price;
      t.save();
    } else {
      console.log('price hasnt changed');
    }
    console.log(product);
    await page.close();
  });
}

scrapeProducts();
