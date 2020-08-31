const express = require('express');
const router = express.Router();
const config = require('config');
const nightmare = require('nightmare');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.get('SendGridApiKey'));

const Tracker = require('../models/Tracker');

// @route    POST api/tracker
// @desc     Create a price tracker in the DB to track a price
// @access   Public
router.post('/', async (req, res) => {
  try {
    console.log('tracking');
    const { url, email } = req.body;

    // priceblock_ourprice
    const priceString = await nightmare()
      .goto(url)
      .wait('#price_inside_buybox')
      .evaluate(() => document.getElementById('price_inside_buybox').innerText)
      .end();

    let priceNum = priceString.replace(/\D/g, '');

    var output = [
      priceNum.slice(0, priceNum.length - 2),
      '.',
      priceNum.slice(priceNum.length - 2),
    ].join('');

    const priceNumber = parseFloat(output);

    await Tracker.create({ email, url, price: priceNumber });

    res.send('successfully created a tracker');
  } catch (err) {
    console.log(err.message);
    console.log('there was an error creating a tracker');
  }
});

module.exports = router;
