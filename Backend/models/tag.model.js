const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Tag name is required"],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
