const { createBlog, getBlogs } = require("../controller/blog");
const router = require("express").Router();
const { protect, permission } = require("../middleware/auth");
const advanceResults = require("../middleware/advanceResults");
const Blog = require("../models/Blog");

router
  .route("/")
  .get(advanceResults(Blog), getBlogs)
  .post(protect, permission("admin"), createBlog);

module.exports = router;
