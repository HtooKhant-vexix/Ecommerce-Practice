const DB = require("../models/delivery");
const Helper = require("../utils/helper");

const add = async (req, res, next) => {
  const has = await DB.findOne({ name: req.body.name });
  if (has) {
    next(new Error(" Delivery already exists"));
  } else {
    console.log(req.body);
    req.body.remark = req.body.remark.split(",");
    const result = await new DB(req.body).save();
    Helper.fMsg(res, " Delivery added successfully", result);
  }
};
const all = async (req, res) => {
  const result = await DB.find();
  res.send({ con: true, msg: "All deli!", result });
};
const get = async (req, res) => {
  const id = req.params.id;
  const result = await DB.findById(id);
  res.send({ con: true, msg: "Single deli!", result });
};
const patch = async (req, res) => {
  const has = await DB.findById(req.params.id);
  if (has) {
    const id = req.params.id;
    await DB.findByIdAndUpdate(id, req.body);
    const result = await DB.find();

    Helper.fMsg(res, `Delivery updated Successfully`, result);
  } else {
    next(new Error(" Deli not found"));
  }
};
const drop = async (req, res) => {
  const has = await DB.findById(req.params.id);
  if (has) {
    const id = req.params.id;
    await DB.findByIdAndDelete(id);
    const result = await DB.find();
    Helper.fMsg(res, `Delivery deleted Successfully`, result);
  } else {
    next(new Error(" Deli not found"));
  }
};

module.exports = {
  add,
  all,
  get,
  patch,
  drop,
};
