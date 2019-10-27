
import userValid from '../middleware/userValid';
import donorCheck from '../middleware/donorCheck';
import DonorController from '../controllers/donors';
// let controllers = require('../controllers/donors');

let router = require('express').Router();


router.post('/respond', userValid, donorCheck, DonorController.respond);

module.exports = router

