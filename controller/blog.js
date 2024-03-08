const asyncHandler = require("../middleware/async");
const createError = require("../utilis/createError");
const path = require("path");
const Blog = require("../models/Blog");
const multer = require('multer');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blogs',
    allowed_formats: ['jpg', 'png', 'webm', 'svg'],
  },
});

const upload = multer({ storage }).fields([
  { name: "blogImage", maxCount: 1 },
  { name: "name" },
  { name: "description" },
]);


const createBlog = asyncHandler(async (req, res, next) => {
  try {
    upload(req, res, async function (err) {
      if (err) {
        return createError(err.status || 400, err.message);
      }

      if (!req.files || !req.files.blogImage) {
        throw createError(400, "Please add a photo");
      }

      const { name, description } = req.body;
      const file = req.files.blogImage[0];

      cloudinary.uploader.upload(
        file.path, // Use the correct path here
        { use_filename: true, folder: "blogs" },
        async function (error, result) {
          if (error) throw createError(409, `Failed to create blog`);
          const blog = await Blog.create({
            name,
            description,
            blogImage: result.url,
          });
          res.status(200).send({
            status: "Success",
            message: "Blog created successfully",
            data: blog,
          });
        }
      );
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
});


const getBlogs = asyncHandler(async (req, res, next) => {
  res.status(200).send({ status: "success", data: res.data });
});

module.exports = {
  createBlog,
  getBlogs,
};
