const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET all movies
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "movies";';
    pool.query(queryText).then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('Error with GET all movies', error);
        res.sendStatus(500);
    });
});

// Sort by id to GET specific movie data
router.get('/:id', (req, res) => {
    let id = [req.params.id]
    let queryText = `SELECT "genres"."name", "movies"."title", "movies"."poster", "movies"."description" 
                    FROM "movies-genres" 
                    JOIN "movies" ON "movies"."id" = "movies-genres"."movie_id"
                    JOIN "genres" ON "genres"."id" = "movies-genres"."genre_id"
                    WHERE "movies-genres"."movie_id"=$1`;
    pool.query(queryText, id)
        .then( (result) => {
            res.send(result.rows);
        })
        .catch( (error) => {
            console.log(`Error on GET by id query ${error}`);
            res.sendStatus(500);
        });
    });

// PUT route sort by id to update movie 
router.put('/edit/:id', (req, res) => {
    const queryText =  `UPDATE "movies" SET "title" = $1, description = $2 WHERE "id" = $3`;
    pool.query(queryText, [req.body.title, req.body.description, req.params.id])
    .then( (result) => {
        res.sendStatus(200);
    })   
    .catch( (error) => {
        console.log(`Error with PUT query ${error}`);
        res.sendStatus(500);
    }); 
})

module.exports = router; 