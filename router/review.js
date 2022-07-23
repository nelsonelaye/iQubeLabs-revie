const express = require("express");
const upload = require("../utils/multer");
const authorizeUser = require("../utils/authorize");
const router = express.Router();
const {
  getAllReviews,
  getOneReview,
  createReview,
  updateReview,
  updateReviewImage,
  deleteReview,
  filterHighestReviews,
} = require("../controller/review");

router.route("/review").get(getAllReviews);

router.get("/review/filter", filterHighestReviews);

router.route("/review/:reviewId").get(getOneReview);

router.route("/user/:userId/review").post(authorizeUser, upload, createReview);
router
  .route("/user/:userId/review/:reviewId")
  .patch(authorizeUser, updateReview)
  .delete(authorizeUser, deleteReview);

router.patch(
  "/user/:userId/review/:reviewId/image",
  authorizeUser,
  upload,
  updateReviewImage
);

module.exports = router;
