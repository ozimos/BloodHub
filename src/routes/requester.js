import {Router} from "express";

import requesterController from '../controllers/requesterController';

const router = Router();


router.route('/')
.post(requesterController.createRequester)
.get(requesterController.fetchrequesters);
router.post('/blood-request', requesterController.postBloodRequest);

export default router;
