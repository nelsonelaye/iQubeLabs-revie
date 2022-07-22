const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
