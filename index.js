const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./routes/User");
// const Subject = require("./routes/Subject.js");

dotenv.config();

const PORT = process.env.PORT || 3500;

const app = express();
nameDB = "db-test";
mongoose
  .connect(`${process.env.MONGO_URL}${nameDB}`)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json());
app.use("/users", User);

app.get("/health", (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: "Ok",
    date: new Date(),
  };
  res.status(200).send(data);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
