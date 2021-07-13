"use strict";

const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async function (req, res, next) {
  try {

    const requestOptions = {
      method: 'GET',
      url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
      qs: {
        'start': '1',
        'limit': '5000',
        'convert': 'USD'
      },
      headers: {
        'X-CMC_PRO_API_KEY': '622a40c1-7348-41a9-a823-b7198dcbdd27'
      },
      json: true,
      gzip: true
    };

    axios(requestOptions).then(response => {
      return res.json(response.data);
    }).catch((err) => {
      console.log('API call error:', err.message);
    });
    
  } catch (err) {
    return next(err);
  }
});

router.get("/:currency", async function (req, res, next) {
  try {

    const query = req.params.currency;

    const requestOptions = {
      method: 'GET',
      url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?slug=${query}`,
      headers: {
        'X-CMC_PRO_API_KEY': '622a40c1-7348-41a9-a823-b7198dcbdd27'
      },
      json: true,
      gzip: true
    };

    axios(requestOptions).then(response => {
      return res.json(response.data);
    }).catch((err) => {
      console.log('API call error:', err.message);
    });
    
  } catch (err) {
    return next(err);
  }
});

module.exports = router;