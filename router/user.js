const express = require("express");
const router = express.Router();
const authorizeUser = require("../utils/authorize");

const {
  getAllUsers,
  getOneUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

router.route("/").get(getAllUsers);

router
  .route("/:userId")
  .get(getOneUser)
  .patch(authorizeUser, updateUser)
  .delete(authorizeUser, deleteUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
