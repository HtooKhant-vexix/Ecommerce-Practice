const { array } = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const deliSchema = new Schema({
  name: { type: String, require: true },
  price: { type: String, require: true },
  duration: { type: String, require: true },
  image: { type: String, require: true },
  remark: { type: Array },
  created: { type: Date, default: Date.now() },
});

const deli = mongoose.model("delivery", deliSchema);
module.exports = deli;
