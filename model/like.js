const mongoose = require("mongoose");

const likeSchema = mongoose.Schema(
  {
    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("likes", likeSchema);
