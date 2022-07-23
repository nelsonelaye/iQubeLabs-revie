const userModel = require("../model/user");
const reviewModel = require("../model/review");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.find();

    res.status(200).json({
      status: "Success",
      data: reviews,
    });
  } catch (error) {
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
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error,
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await reviewModel.findById(reviewId);

    const user = await userModel.findById(req.params.userId);

    if (user) {
      if (review) {
        const newReview = await reviewModel.findByIdAndUpdate(
          review._id,
          req.body,
          { new: true }
        );

        user.reviews.pull(mongoose.Types.ObjectId(review._id));
        user.reviews.push(mongoose.Types.ObjectId(newReview._id));
        user.save();

        res.status(200).json({
          status: "Success",
          data: newReview,
        });
      } else {
        res.status(404).json({
          message: "Review not found",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const updateReviewImage = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await reviewModel.findById(reviewId);
    const user = await userModel.findById(req.params.userId);

    if (user) {
      if (review) {
        await cloudinary.uploader.destroy(review.imageId);
        const result = await cloudinary.uploader.upload(req.file.path);

        const newReview = await reviewModel.findByIdAndUpdate(
          review._id,
          {
            image: result.secure_url,
            imageId: result.public_id,
          },
          { new: true }
        );

        user.reviews.pull(mongoose.Types.ObjectId(review._id));
        user.reviews.push(mongoose.Types.ObjectId(newReview._id));
        user.save();

        res.status(200).json({
          status: "Success",
          data: newReview,
        });
      } else {
        res.status(404).json({
          message: "Review not found",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const review = await reviewModel.findById(reviewId);
    const user = await userModel.findById(req.params.userId);
    if (user) {
      if (review) {
        await cloudinary.uploader.destroy(review.imageId);
        await reviewModel.findByIdAndDelete(review._id);

        user.reviews.pull(mongoose.Types.ObjectId(review._id));
        user.save();

        res.status(204).json({
          status: "Success",
          message: "Review deleted",
        });
      } else {
        res.status(404).json({
          message: "Review not found",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const filterHighestReviews = async (req, res) => {
  try {
    var mysort = { likes: -1 };
    const reviews = await reviewModel
      .find()
      .sort(mysort)
      .exec((err, result) => {
        if (err) {
          res.status(500).json({
            message: error.message,
          });
        } else {
          res.status(200).json({
            status: "Success",
            data: result,
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

module.exports = {
  getAllReviews,
  getOneReview,
  createReview,
  updateReview,
  updateReviewImage,
  deleteReview,
  filterHighestReviews,
};
