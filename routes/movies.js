const router = require('express').Router();

const { validateMovie, validateMovieId } = require('../middlewares/validation');

const {
  getMovies, deleteMovie, createMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:cardId', validateMovieId, deleteMovie);

router.post('/', validateMovie, createMovie);

module.exports = router;
