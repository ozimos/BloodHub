
const router = require('express').Router();

import usersController from '../controllers/usersController';


router.post('/signup', usersController.signup);
router.post('/signin', userValid, usersController.signin);
module.exports = router;
