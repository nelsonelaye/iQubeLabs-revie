const userModel = require("../model/user");
const reviewModel = require("../model/review");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const cloudinary = require("cloudinary");
const mongoose = require("mongoose");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find();

    res.status(200).json({
      status: "Success",
      data: reviews,
    });
  } catch {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const getOneReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await reviewModel.findById(reviewId);

    if (review) {
      res.status(200).json({
        status: "Success",
        data: review,
      });
    } else {
      res.status(404).json({
        message: "Review not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const {
      apartmentReview,
      apartmentAddress,
      reviewOnLandlord,
      reviewOnEnvironment,
      reviewOnAmenities,
    } = req.body;

    const user = await userModel.findById(req.params.userId);

    if (user) {
      const result = await cloudinary.uploader.upload(req.file.path);

      const review = new reviewModel({
        apartmentReview,
        apartmentAddress,
        reviewOnLandlord,
        reviewOnEnvironment,
        reviewOnAmenities,
        image: result.secure_url,
        imageId: result.public_id,
      });

      review.postedBy = user;
      review.save();

      user.reviews.push(mongoose.Types.ObjectId(review._id));
      user.save();

      res.status(201).json({
        status: "Success",
        data: review,
      });
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = {
  getAllReviews,
  getOneReview,
};
