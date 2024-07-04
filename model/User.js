const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, require: true },
    phone: { type: Number, require: true },
    pass: { type: String, require: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("User", UserSchema, "user");
