const userModel = require("../model/user");
const reviewModel = require("../model/review");
const likeModel = require("../model/like");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const cloudinary = require("../utils/cloudinary");
const mongoose = require("mongoose");

const getAllLikes = async (req, res) => {
  try {
    const likes = await likeModel.find();

    res.status(200).json({
      status: "Success",
      data: likes,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const markAsHelpful = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.reviewId);

    if (review) {
      const like = new likeModel();

      like.review = review;
      like.save();

      review.likes.push(mongoose.Types.ObjectId(like._id));
      review.save();
      res.status(201).json({
        status: "Success",
        data: like,
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

const unmarkAsHelpful = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.reviewId);
    const like = await likeModel.findById(req.params.likeId);

    if (review) {
      if (like) {
        await likeModel.findByIdAndDelete(like._id);

        review.likes.pull(mongoose.Types.ObjectId(like._id));
        review.save();

        res.status(200).json({
          status: "Success",
          message: "Like removed",
        });
      } else {
        res.status(404).json({
          message: "You haven't mark the review as helpful yet",
        });
      }
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

module.exports = {
  getAllLikes,
  markAsHelpful,
  unmarkAsHelpful,
};
