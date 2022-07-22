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

    apartmentReview: {
      type: String,
      required: true,
    },
    apartmentAddress: {
      type: String,
    },
    reviewOnLandlord: {
      type: String,
    },
    reviewOnEnvironment: {
      type: String,
    },
    reviewOnAmenities: {
      type: String,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("reviews", reviewSchema);
