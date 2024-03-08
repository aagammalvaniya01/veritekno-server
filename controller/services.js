const asyncHandler = require("../middleware/async");
const createError = require("../utilis/createError");
const path = require("path");
const Service = require("../models/Service");

const createServices = asyncHandler(async (req, res, next) => {
  const service = await Service.create(req.body);
  res.status(201).send({ status: "success", data: service });
});

const getServices = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.data });
});

module.exports = {
  createServices,
  getServices,
};
