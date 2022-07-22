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

const getOneLike = async (req, res) => {
  try {
    const likeId = req.params.likeId;
    const like = await likeModel.findById(likeId);

    if (like) {
      res.status(200).json({
        status: "Success",
        data: like,
      });
    } else {
      res.status(404).json({
        message: "No helpful marks found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const markHelpful = async (req, res) => {
  try {
    const review = await reviewModel.findById(req.params.reviewId);

    const user = await userModel.findById(req.params.userId);

    if (user) {
      if (review) {
        const like = new likeModel();
        like.user = user;
        like.review = review;
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
module.exports = {
  getAllLikes,
  getOneLike,
};
