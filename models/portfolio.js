"use strict";

const db = require("../db");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

/** Related functions for users. */

class Portfolio {
  static async insert({ username, cryptocurrency, quantity }) {
    
    // Check if username already exists in database
    const duplicateCheck = await db.query(
      `SELECT cryptocurrency
        FROM portfolio
        WHERE cryptocurrency = $1
      `, [cryptocurrency],
    );
    
    // Throw error if username already exists
    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate cryptocurrency: ${cryptocurrency}`);
    }

    const result = await db.query(
          `INSERT INTO portfolio (
              username,
              cryptocurrency,
              quantity
           )
           VALUES ($1, $2, $3)
           RETURNING 
              username, 
              cryptocurrency, 
              quantity
          `, [username, cryptocurrency, quantity],
    );

    const currency = result.rows[0];

    return currency;
  }

  /** Find all users.
   *
   * Returns [{ username, first_name, last_name, email, is_admin }, ...]
   **/

  static async findAll(username) {
    const result = await db.query(
          `SELECT username,
                  cryptocurrency,
                  quantity
           FROM portfolio
           WHERE username = $1
          `, [username],
    );

    return result.rows;
  }


  static async findCurrency(username, cryptocurrency) {
    const result = await db.query(
      `SELECT username,
              cryptocurrency,
              quantity
       FROM portfolio
       WHERE username = $1 AND
             cryptocurrency = $2
      `, [username, cryptocurrency],
    );

    return result.rows;
  }

  /** Delete given cryptocurrency from database for a given user; returns undefined. */

  static async remove(username, cryptocurrency) {
    let result = await db.query(
          `DELETE
           FROM portfolio
           WHERE username = $1 AND
                 cryptocurrency = $2
           RETURNING username, cryptocurrency
          `, [username, cryptocurrency],
    );
    const deletedCurrency = result.rows[0];

    if (!deletedCurrency) throw new NotFoundError(`No matching combination for: ${username} & ${cryptocurrency}`);
  }
}

module.exports = Portfolio;