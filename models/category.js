const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, require: true, unique: true },
  image: { type: String, require: true },
  subcats: [{ type: Schema.Types.ObjectId, ref: "subcategory" }],
  created: { type: Date, default: Date.now() },
});

const category = mongoose.model("category", categorySchema);
module.exports = category;
