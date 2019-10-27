
const express = require('express');
const router = express.Router();
const users = require('./users');
const hospitals = require('./hospital');
const bloodGroup= require('./blood');

router.get("/", (req, res)=>{
    res.send("Hello")
})
router.use('/users', users);
router.use('/hospitals', hospitals);
router.use('/blood-groups', bloodGroup
    );
// router.use('/donors',require('./donors'));
router.use('/requester',require('./requester'));
module.exports = router;
