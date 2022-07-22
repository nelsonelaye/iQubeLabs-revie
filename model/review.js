const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },

    image: {
      type: String,
    },
    imageId: {
      type: String,
    },
    helpfulMarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],

    apartmentReview: {
      type: String,
      required: true,
    },
    apartmentAddress: {
      type: String,
    },
    landlordReview: {
      type: String,
    },
    environmentReview: {
      type: String,
    },
    amenitiesReview: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);
