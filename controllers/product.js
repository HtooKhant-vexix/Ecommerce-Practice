const { findById } = require("../models/product");
const DB = require("../models/product");
const Helper = require("../utils/helper");

const add = async (req, res, next) => {
  const has = await DB.findOne({ name: req.body.name });
  if (has) {
    next(new Error(" Product already exists"));
  } else {
    req.body.feature = req.body.feature.split(",");
    req.body.delivery = req.body.delivery.split(",");
    req.body.color = req.body.color.split(",");
    // req.body.images = req.body.images.split(",")
    const product = await new DB(req.body).save();
    Helper.fMsg(res, "Product added successfully", product);
  }
};
const all = async (req, res) => {
  const result = await DB.find().populate("cat");
  res.send({ con: true, msg: "All products!", result });
};

const paginate = async (req, res) => {
  const page = Number(req.params.page);
  const limit = Number(process.env.PAGE_LIMIT);
  const reqPage = page == 1 ? 0 : page - 1;
  const skipCount = reqPage * limit;
  const result = await DB.find().skip(skipCount).limit(limit);
  Helper.fMsg(res, `page${page}`, result);
};

const productByCat = async (req, res) => {
  const page = Number(req.params.page);
  const limit = Number(process.env.PAGE_LIMIT);
  const reqPage = page == 1 ? 0 : page - 1;
  const skipCount = reqPage * limit;
  const result = await DB.find({ cat: req.params.id })
    .skip(skipCount)
    .limit(limit);
  Helper.fMsg(res, `page${page}`, result);
};

const productByTag = async (req, res) => {
  const page = Number(req.params.page);
  const limit = Number(process.env.PAGE_LIMIT);
  const reqPage = page == 1 ? 0 : page - 1;
  const skipCount = reqPage * limit;
  const result = await DB.find({ tag: req.params.id })
    .skip(skipCount)
    .limit(limit);
  Helper.fMsg(res, `page${page}`, result);
};

const patch = async (req, res) => {
  const id = req.params.id;
  await DB.findByIdAndUpdate(id);
  const result = await DB.findById(id);
  res.send({ con: true, msg: "product Updated!", result });
};

const drop = async (req, res) => {
  const id = req.params.id;
  const result = await DB.findByIdAndDelete(id);
  res.send({ con: true, msg: "product Deleted!", result });
};

module.exports = {
  add,
  all,
  productByCat,
  productByTag,
  paginate,
  patch,
  drop,
};
