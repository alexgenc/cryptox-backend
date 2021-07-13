"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const Portfolio = require("../models/portfolio");
const router = express.Router();


/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: admin
 **/

router.post("/", async function (req, res, next) {
  try {
    // const validator = jsonschema.validate(req.body, userNewSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const portfolio = await Portfolio.insert(req.body);
   
    return res.status(201).json({ portfolio });
  } catch (err) {
    return next(err);
  }
});


/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

router.get("/:username", async function (req, res, next) {
  try {
    const cryptocurrencies = await Portfolio.findAll(req.params.username);
    return res.json({ cryptocurrencies });
  } catch (err) {
    return next(err);
  }
});


router.get("/:username/:cryptocurrency", async function (req, res, next) {
  try {
    const cryptocurrency = await Portfolio.findCurrency(req.params.username, req.params.cryptocurrency);
    return res.json({ cryptocurrency });
  } catch (err) {
    return next(err);
  }
});

router.delete("/:username/:cryptocurrency", async function (req, res, next) {
  try {
    await Portfolio.remove(req.params.username, req.params.cryptocurrency);
    return res.json({ deleted: req.params.cryptocurrency });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
