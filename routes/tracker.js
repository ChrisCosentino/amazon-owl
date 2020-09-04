const express = require('express');
const router = express.Router();
// const nightmare = require('nightmare');
const puppeteer = require('puppeteer');
const config = require('config');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SG_API_KEY || config.get('SendGridApiKey'));

const Tracker = require('../models/Tracker');

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

const browserPromise = puppeteer.launch({
  headless: true,
  args: ['--no-sandbox'],
});

// @route    POST api/tracker
// @desc     Create a price tracker in the DB to track a price
// @access   Public
router.post('/', async (req, res) => {
  try {
    console.log('tracking');
    const { url, email } = req.body;

    const browser = await browserPromise;
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

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

    console.log('made product');

    await context.close();
    product.url = url;
    product.email = email;
    console.log(product);

    await Tracker.create(product);
    console.log('creating email');
    await sendEmail(
      product.email,
      'Youve created a tracker',
      `You created a tracker for ${product.title} for $${product.price} \n 
      The link is: ${url}`
    );

    console.log('sent email');
    console.log('successfully created a tracker');
    res.send({ msg: 'successfully created a tracker' });
  } catch (err) {
    console.log(err.message);
    console.log('there was an error creating a tracker');
    res.status(400).send({ err: 'Error creating a tracker try again' });
  }
});

module.exports = router;
