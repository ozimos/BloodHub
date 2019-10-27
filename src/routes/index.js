
const express = require('express');
const router = express.Router();
const users = require('./users');

router.use('/users', users);
// router.use('/donors',require('./donors'));
// router.use('/requester',require('./requester'));
// router.use('/ibsbridge',require('./v1/IBSBridge'));
module.exports = router;
