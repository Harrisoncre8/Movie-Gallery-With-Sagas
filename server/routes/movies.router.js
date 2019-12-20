const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all movies
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "movies" ORDER BY "id";';
    pool.query(queryText).then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('error getting movies', error);
      res.sendStatus(500);
    });
  });

module.exports = router; 