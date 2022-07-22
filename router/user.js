const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getOneUser,
  registerUser,
  loginUser,
} = require("../controller/user");

router.route("/").get(getAllUsers);

router.get("/:userId", getOneUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
