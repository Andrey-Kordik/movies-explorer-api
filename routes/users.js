const router = require('express').Router();

const { getMyData, updateUserData
} = require('../controllers/users');

router.get('/me', getMyData);
router.patch('/me', updateUserData);

module.exports = router;