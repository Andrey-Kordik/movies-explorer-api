const router = require('express').Router();

const { validateUserUpdate } = require('../middlewares/validation');

const { getMyData, updateUserData } = require('../controllers/users');

router.get('/me', getMyData);
router.patch('/me', validateUserUpdate, updateUserData);

module.exports = router;
