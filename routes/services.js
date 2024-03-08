const { createServices, getServices } = require("../controller/services");
const router = require("express").Router();
const { protect, permission } = require("../middleware/auth");
const advanceResults = require("../middleware/advanceResults");
const Service = require("../models/Service");

router
  .route("/")
  .get(advanceResults(Service), getServices)
  .post(protect, permission("admin"), createServices);

module.exports = router;
