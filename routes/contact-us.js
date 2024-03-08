const { contactUs } = require("../controller/contact-us");
const router = require("express").Router();

router.route("/").post(contactUs);

module.exports = router;
