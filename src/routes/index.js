
const express = require('express');
const router = express.Router();
const users = require('./users');

router.use('/users', users);
// router.use('/donors',require('./donors'));
// router.use('/requester',require('./requester'));
module.exports = router;
