const router = require('express').Router();

const {
  getMovies, deleteMovie, createMovie
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:cardId', deleteMovie);

router.post('/', createMovie);

module.exports = router;
