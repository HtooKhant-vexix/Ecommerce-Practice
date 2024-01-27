const { findById } = require("../models/permit");
const DB = require("../models/permit");
const Helper = require("../utils/helper");

const add = async (req, res) => {
  const dbPermit = await DB.findOne({ name: req.body.name });
  if (dbPermit) {
    next(new Error("Permission is already in use"));
  } else {
    const data = new DB(req.body);
    const result = await data.save();
    Helper.fMsg(res, "Permission Saved!", result);
  }
  // res.send({ con: true, msg: "Permit saved!", result });
};

const all = async (req, res) => {
  const result = await DB.find().select("-__v");
  res.send({ con: true, msg: "All Permits!", result });
};

const get = async (req, res) => {
  const id = req.params.id;
  const result = await DB.findById(id).select("-__v");
  if (result) {
    Helper.fMsg(res, "Single Permission", result);
  } else {
    next(new Error("No Permission with that id"));
  }
  // res.send({ con: true, msg: "Single Permit!", result });
};

const patch = async (req, res) => {
  const id = req.params.id;
  const dbPermit = await DB.findById(id);
  console.log(dbPermit);
  if (dbPermit) {
    await DB.findByIdAndUpdate(dbPermit._id, req.body);
    const result = await DB.findById(dbPermit._id);
    Helper.fMsg(res, "Permit Updated", result);
  } else {
    next(new Error("No Permission with that id"));
  }
  // res.send({ con: true, msg: "Permit Updated!", result });
};

const drop = async (req, res) => {
  const id = req.params.id;
  const dbPermit = await DB.findById(id);
  if (dbPermit) {
    await DB.findByIdAndDelete(dbPermit._id);
    Helper.fMsg(res, "Deleted Permission");
  } else {
    next(new Error("No Permission with that id"));
  }
  // res.send({ con: true, msg: "Permit Deleted!", result });
};

module.exports = {
  add,
  all,
  get,
  patch,
  drop,
};
