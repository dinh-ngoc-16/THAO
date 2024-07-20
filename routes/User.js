const router = require("express").Router();
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { verifyToken } = require("./VerifyToken");

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

router.post("/signup", async (req, res) => {
  const user = new User({
    username: req.body.username,
    mail: req.body.mail,
    gender: req.body.gender,
    pass: CryptoJS.AES.encrypt(req.body.pass, process.env.PASS_SEC).toString(),
  });
  try {
    const saveUser = await user.save();
    console.log(JSON.stringify(saveUser));
    res.status(200).json(saveUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  if (res.body == undefined) {
    res.status(500);
  }
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json("Wrong credentials!");
      return;
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.pass,
      process.env.PASS_SEC,
    );

    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (OriginalPassword !== req.body.pass) {
      res.status(401).json("Wrong credentials!");
      return;
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        isValidToken: true,
      },
      process.env.JWT_SEC,
      { expiresIn: "1d" },
    );

    const { _id } = user._doc;
    console.log(JSON.stringify({ id: _id, accessToken }));
    res.status(200).json({ id: _id, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    let data = await User.findById(req.params?.id);
    const response = data ? data : {};
    console.log("user detail", JSON.stringify(response));
    res.status(200).json(response);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json(error);
  }
});

module.exports = router;
