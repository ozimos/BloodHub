
const router = require('express').Router();

import usersController from '../controllers/usersController';
const userValid = require('../middleware/userValid');


router.post('/signup', usersController.signup);
router.post('/signin', userValid, usersController.signin);
module.exports = router;
