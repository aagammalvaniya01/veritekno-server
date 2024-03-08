const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  servicesName:{
    type: String,
    required: [true, "Blog name is required"],
    trim: true,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
