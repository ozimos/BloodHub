const express = require("express");
const router = express.Router();

const users = require("./users");
const hospitals = require("./hospital");

router.get("/", (req, res) => {
  res.send("Hello");
});
router.use("/users", users);
router.use("/hospitals", hospitals);
router.use("/requester", require("./requester"));

module.exports = router;
