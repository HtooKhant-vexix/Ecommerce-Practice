const mongoose = require("mongoose");
const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: { type: String, require: true },
  created: { type: Date, default: Date.now() },
  permit: [{ type: Schema.Types.ObjectId, ref: "permit" }],
});

const Role = mongoose.model("role", RoleSchema);
module.exports = Role;
