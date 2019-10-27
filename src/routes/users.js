
import usersController from '../controllers/UsersController';
import userValid from '../middleware/userValid';

const router = require('express').Router();

router.post('/signup', usersController.signup);
router.post('/signin', userValid, usersController.signin);
module.exports = router;
