const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name:{
    type: String,
    required: [true, "Blog name is required"],
    trim: true,
  },
  blogImage: {
    type: String,
    required: [true, "Image is required"],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
  },
});

module.exports = mongoose.model("Blog", BlogSchema);
