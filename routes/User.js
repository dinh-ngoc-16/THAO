const router = require("express").Router();
const User = require("../model/User");

router.get("/", async (req, res) => {
  try {
    const data = await User.find();
    console.log("responese get list user: ", JSON.stringify(data));
    res.status(200).send(data);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({
      error: error,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    let data = await User.findById(req.params?.id);
    const response = data ? data : {};
    console.log("user detail", JSON.stringify(response));
    res.status(200).send(response);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send({ error });
  }
});

module.exports = router;
