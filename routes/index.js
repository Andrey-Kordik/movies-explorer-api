const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/users');
const { validateUserCreation, validateUserLogin } = require('../middlewares/validation');

const NotFoundError = require('../errors/NotFoundError');

const usersRouter = require('./users');
const moviesRouter = require('./movies');

router.post('/signin', validateUserLogin, login);
router.post('/signup', validateUserCreation, createUser);

router.use(auth);
router.get('/signout', logout);

router.use('/users', usersRouter);
router.use('/users', moviesRouter);

router.use((req, res, next) => {
  const error = new NotFoundError('Страница не найдена');
  next(error);
});

module.exports = router;
