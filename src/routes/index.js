import express from "express";
import users from "./users";
import hospitals from "./hospital";
import requester from "./requester";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello");
});
router.use("/users", users);
router.use("/hospitals", hospitals);
router.use("/requester", requester);

export default router;
