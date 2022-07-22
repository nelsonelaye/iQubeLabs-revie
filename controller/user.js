const userModel = require("../model/user");
const reviewModel = require("../model/review");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      status: "Success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await userModel.findById(userId);

    if (user) {
      res.status(200).json({
        status: "Success",
        data: user,
      });
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

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, tel, password } = req.body;
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "user already exist",
      });
    } else {
      const salted = await bcrypt.genSalt(16);
      const hashed = await bcrypt.hash(password, salted);

      const user = await userModel.create({
        firstName,
        lastName,
        email,
        tel,
        password: hashed,
      });

      res.status(201).json({
        status: "Success",
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        const token = await jwt.sign(
          {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            tel: user.tel,
          },
          process.env.TOKEN,
          { expiresIn: process.env.EXPIRES }
        );

        const { password, ...rest } = user._doc;

        res.status(200).json({
          status: "Success",
          message: "Login successful",
          data: { token, ...rest },
        });
      } else {
        res.status(400).json({
          message: "Password is incorrect",
        });
      }
    } else {
      res.status(404).json({
        message: "user not found",
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
  getAllUsers,
  getOneUser,
  registerUser,
  loginUser,
};
