const router = require("express").Router();
const User = require("../model/User");

router.get("/", async (req, res) => {
  const data = await User.find();
  console.log("responese get list user: ", JSON.stringify(data));
  res.status(200).send(data);
});

module.exports = router;
