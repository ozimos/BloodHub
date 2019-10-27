
const router = require('express').Router();

import usersController from '../controllers/UsersController';

router.post('/signup', usersController.signup);
router.post('/signin', usersController.signin);
module.exports = router;