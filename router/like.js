const express = require("express");
const router = express.Router();
const {
  getAllLikes,
  markAsHelpful,
  unmarkAsHelpful,
} = require("../controller/like");

router.get("/like", getAllLikes);
router.post("/review/:reviewId/like", markAsHelpful);
router.post("/review/:reviewId/like/:likeId", unmarkAsHelpful);

module.exports = router;
