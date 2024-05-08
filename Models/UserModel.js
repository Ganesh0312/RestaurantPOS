const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    userid: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    verified: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
