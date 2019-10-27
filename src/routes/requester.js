
import requesterController from '../controllers/requesterController';

let router = require('express').Router();


router.post('/', requesterController.createRequester);
router.post('/blood-request', requesterController.postBloodRequest);
router.get('/', requesterController.fetchrequesters);

module.exports = router
