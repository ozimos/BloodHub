import {Router} from "express";

const router = Router();

import hospitalController from '../controllers/hospitalConntroller';

router.post('/populate', hospitalController.populate);
router.get('/fetch', hospitalController.fetch);

export default router;
