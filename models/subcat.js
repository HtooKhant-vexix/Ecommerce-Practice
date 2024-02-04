const mongoose = require("mongoose");
const { Schema } = mongoose;

const subcatSchema = new Schema({
  name: { type: String, require: true },
  image: { type: String, require: true },
  catId: { type: Schema.Types.ObjectId, ref: "Category" },
  childcats: [{ type: Schema.Types.ObjectId, ref: "childcat" }],
  created: { type: Date, default: Date.now() },
});

const subcat = mongoose.model("subcategory", subcatSchema);
module.exports = subcat;
