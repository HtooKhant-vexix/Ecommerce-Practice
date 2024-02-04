const { findById } = require("../models/tag");
const DB = require("../models/tag");
const Helper = require("../utils/helper");

const add = async (req, res) => {
  const has = await DB.findOne({ name: req.body.name });
  if (has) {
    next(new Error(" Tag already exists"));
  } else {
    const result = await new DB(req.body).save();
    Helper.fMsg(res, " success", result);
  }
};
const all = async (req, res) => {
  const result = await DB.find();
  res.send({ con: true, msg: "All tags!", result });
};
const get = async (req, res) => {
  const id = req.params.id;
  const result = await DB.findById(id);
  res.send({ con: true, msg: "Single tag!", result });
};
const patch = async (req, res) => {
  const has = await DB.findById(req.params.id);
  if (has) {
    const id = req.params.id;
    await DB.findByIdAndUpdate(id, req.body);
    const result = await DB.find();
    res.send({ con: true, msg: "tag Updated!", result });
  } else {
    next(new Error(" Tag not found"));
  }
};
const drop = async (req, res) => {
  const has = await DB.findById(req.params.id);
  if (has) {
    const id = req.params.id;
    await DB.findByIdAndDelete(id);
    const result = await DB.find();
    res.send({ con: true, msg: "tag Deleted!", result });
  } else {
    next(new Error(" Tag not found"));
  }
};

module.exports = {
  add,
  all,
  get,
  patch,
  drop,
};
