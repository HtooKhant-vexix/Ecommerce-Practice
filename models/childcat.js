const mongoose = require("mongoose");
const { Schema } = mongoose;

const childcatSchema = new Schema({
  name: { type: String, require: true, unique: true },
  image: { type: String, require: true },
  subcatId: { type: Schema.Types.ObjectId, ref: "subcategory" },
  created: { type: Date, default: Date.now() },
});

const childcat = mongoose.model("childcat", childcatSchema);
module.exports = childcat;
