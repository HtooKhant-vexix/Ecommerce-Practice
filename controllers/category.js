// const { findById } = require("../models/category");
const DB = require("../models/category");
const Helper = require("../utils/helper");

const all = async (req, res, next) => {
  let cats = await DB.find().populate("subcats");
  Helper.fMsg(res, "cat", cats);
};

const add = async (req, res, next) => {
  const dbCat = await DB.findOne({ name: req.body.name });
  if (dbCat) {
    next(new Error("Category Name is already in use"));
    return;
  }
  let result = await new DB(req.body).save();
  Helper.fMsg(res, "Category", result);
};

const get = async (req, res, next) => {
  const result = await DB.findById(req.params.id);
  Helper.fMsg(res, "ger single data", result);
};

const patch = async (req, res, next) => {
  const result = await DB.findById(req.params.id);
  if (result) {
    await DB.findByIdAndUpdate(result._id, req.body);
    let update = await DB.findById(req.params.id);
    // console.log(update);
    Helper.fMsg(res, "updated image", update);
  } else {
    next(new Error("image can't update"));
  }
  // console.log(req.body)
};

const drop = async (req, res, next) => {
  const dCat = await DB.findById(req.params.id);
  if (dCat) {
    await DB.findByIdAndDelete(req.params.id);
    Helper.fMsg(res, "deleted");
  } else {
    next(new Error("can't delete"));
  }
};

module.exports = {
  add,
  all,
  get,
  patch,
  drop,
};
