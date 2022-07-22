const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getOneUser,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

router.route("/").get(getAllUsers);

router.route("/:userId").get(getOneUser).patch(updateUser).delete(deleteUser);

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
