const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  image: { type: String, required: true },
  specialty: { type: String, required: true },
  rating: { type: Number, required: true },
  details: { type: String, default: "" },
});

module.exports = mongoose.model("Hospital", hospitalSchema);