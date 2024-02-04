const mongoose = require("mongoose");
const { Schema } = mongoose;

const tagSchema = new Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
  //   image: {type: String,  default: "https://via.placeholder.com/150"},
  created: { type: Date, default: Date.now() },
});

const tag = mongoose.model("tag", tagSchema);
module.exports = tag;
