
let express = require('express');
let router = express.Router();


router.use('/donors',require('./donors'));
router.use('/requester',require('./requester'));
// router.use('/ibsbridge',require('./v1/IBSBridge'));
module.exports = router;
