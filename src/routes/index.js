
const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/donors',require('./donors'));
// router.use('/requester',require('./requester'));
// router.use('/ibsbridge',require('./v1/IBSBridge'));
module.exports = router;
