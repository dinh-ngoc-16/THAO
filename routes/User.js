const router = require("express").Router();
const User = require("../model/User");

router.get("/", async (req, res) => {
  const data = await User.find();
  res.status(200).send(data);
});

module.exports = router;
