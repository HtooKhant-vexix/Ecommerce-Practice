const { findById } = require("../models/user");
const DB = require("../models/user");
const Helper = require("../utils/helper");

const register = async (req, res) => {
  const dbEmailUser = await DB.findOne({ email: req.body.email });
  if (dbEmailUser) {
    next(new Error("Email is already taken"));
  }
  const dbPhoneUser = await DB.findOne({ email: req.body.phone });
  if (dbPhoneUser) {
    next(new Error("Phone is already taken"));
  }
  const data = new DB(req.body);
  const result = await data.save();
  Helper.fMsg(res, "User added", result);
};

const all = async (req, res) => {
  const result = await DB.find();
  res.send({ con: true, msg: "All users!", result });
};
const get = async (req, res) => {
  const id = req.params.id;
  const result = await DB.findById(id);
  res.send({ con: true, msg: "Single user!", result });
};
const patch = async (req, res) => {
  const id = req.params.id;
  await DB.findByIdAndUpdate(id);
  const result = await DB.findById(id);
  res.send({ con: true, msg: "user Updated!", result });
};
const drop = async (req, res) => {
  const id = req.params.id;
  const result = await DB.findByIdAndDelete(id);
  res.send({ con: true, msg: "user Deleted!", result });
};

module.exports = {
  register,
  all,
  get,
  patch,
  drop,
};
