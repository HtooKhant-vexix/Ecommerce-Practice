const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, require: true },
  price: { type: String, require: true },
  brand: { type: String, require: true },
  cat: { type: Schema.Types.ObjectId, ref: "category", require: true },
  subcat: { type: Schema.Types.ObjectId, ref: "subcategory", require: true },
  childcat: { type: Schema.Types.ObjectId, ref: "childcat", require: true },
  tag: { type: Schema.Types.ObjectId, ref: "tag", require: true },
  discount: { type: Number, default: 0 },
  feature: { type: Array, require: true },
  desc: { type: String, require: true },
  deail: { type: String, require: true },
  status: { type: Boolean, default: true },
  dilivery: [{ type: Schema.Types.ObjectId, ref: "delivery", require: true }],
  color: { type: Array, require: true },
  images: { type: Array, require: true },
  size: { type: String, require: true },
  rating: { type: String, defult: "0" },
  created: { type: Date, default: Date.now() },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
