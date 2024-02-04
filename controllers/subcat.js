const { findById } = require("../models/subcat");
const DB = require("../models/subcat");
const catDB = require("../models/category");
const Helper = require("../utils/helper");

const add = async (req, res, next) => {
  const subcat = await DB.findOne({ name: req.body.name });
  if (subcat) {
    next(new Error("sub cat is already using this name"));
  } else {
    const hasCat = await catDB.findById(req.body.catId);
    if (hasCat) {
      const result = await new DB(req.body).save();
      await catDB.findByIdAndUpdate(hasCat._id, {
        $push: { subcats: result._id },
      });
      const updatedData = await catDB.findById(hasCat._id);
      Helper.fMsg(res, "added", updatedData);
    } else {
      next(new Error(" Category does not exist in the database"));
    }
  }
};
const all = async (req, res) => {
  const result = await DB.find();
  Helper.fMsg(res, "sub category list", result);
};

const get = async (req, res) => {
  const id = req.params.id;
  const result = await DB.findById(id);
  Helper.fMsg(res, "single sub category ", result);
};

const patch = async (req, res) => {
  const subcat = await DB.findById(req.params.id);
  if (subcat) {
    await DB.findByIdAndUpdate(subcat._id, req.body);
    const updateSubCat = await DB.findById(req.params.id);
    Helper.fMsg(res, "updated Sub Catogery", updateSubCat);
  } else {
    next(new Error(" Subcategory Does Not Exist"));
  }
};

const drop = async (req, res, next) => {
  const subcat = await DB.findById(req.params.id);
  if (subcat) {
    await catDB.findByIdAndUpdate(subcat.catId, {
      $pull: { subcats: subcat._id },
    });
    await DB.findByIdAndDelete(subcat._id);
    const result = await catDB.findById(subcat.catId);
    Helper.fMsg(res, "Sub category deleted successfully", result);
  } else {
    next(new Error(" Subcategory Does Not Exist"));
  }
};

module.exports = {
  add,
  all,
  get,
  patch,
  drop,
};
