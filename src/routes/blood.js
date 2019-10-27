
const router = require('express').Router();

import bloodGroupController from '../controllers/bloodTypesController';

router.post('/populate',bloodGroupController.populate );
router.get('/fetch', bloodGroupController.fetch);

module.exports = router;
