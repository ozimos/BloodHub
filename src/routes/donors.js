import {Router} from "express";

import userValid from '../middleware/userValid';
import donorCheck from '../middleware/donorCheck';
import DonorController from '../controllers/donors';

const router = Router();

router.post('/respond', userValid, donorCheck, DonorController.respond);

export default router;

