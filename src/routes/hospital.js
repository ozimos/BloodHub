
const router = require('express').Router();

import hospitalController from '../controllers/hospitalConntroller';

router.post('/populate', hospitalController.populate);
router.get('/fetch', hospitalController.fetch);

module.exports = router;
