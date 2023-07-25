const Movie = require('../models/movie');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const ValidationError = require('../errors/ValidationError');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId
  } = req.body;

  Movie.create({
    country, director, duration, year, description,
    image, trailer, nameRU, nameEN, thumbnail, movieId,
    owner: req.user._id
  })
  .then(movie => {
    res.status(201).send(movie);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      throw new ValidationError('Переданы некорректные данные при создании фильма.');
    }
    return next(err);
  });
};


const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (!movie.owner._id.equals(req.user._id)) {
        throw new ForbiddenError('Нет прав на удаление этого фильма');
      }
      return Movie.findByIdAndRemove(movieId)
        .then(() => res.status(200).send({ message: 'Фильм удален' }));
    }).catch(next);
};

module.exports = {
  getMovies,
  createMovie,
  deleteMovie
};