const asyncHandler = require("../middleware/async");
const sendEmail = require("../utilis/sendEmail");
const createError = require("../utilis/createError");


const contactUs = asyncHandler(async (req, res, next) => {
  try {
    const subject = `test subject`;

    const options = {
      email: req.body.email,
      subject,
      message: req.body.message,
      name: req.body.name,
    };
    // await sendEmail(options);

    res
      .status(200)
      .send({ status: "success", message: "Your query is submitted" });
  } catch (error) {
      console.log('console_error', error)
    throw createError(500, "Email cound't be sent");
  }
});

module.exports = {
  contactUs,
};
