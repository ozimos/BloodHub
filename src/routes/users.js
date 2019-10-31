import {Router} from "express";
import usersController from "../controllers/usersController";

const router = Router();
router.post("/signup", usersController.signup);
router.post("/signin", usersController.signin);
export default router;
