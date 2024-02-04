const { findById } = require("../models/subcat");
const DB = require("../models/childcat");
const subcatDB = require("../models/subcat");
const Helper = require("../utils/helper");

const add = async (req, res, next) => {
  const childcat = await DB.findOne({ name: req.body.name });
  if (childcat) {
    next(new Error("sub cat is already using this name"));
  } else {
    const hasCat = await subcatDB.findById(req.body.subcatId);
    if (hasCat) {
      const result = await new DB(req.body).save();
      await subcatDB.findByIdAndUpdate(hasCat._id, {
        $push: { childcats: result._id },
      });
      const updatedData = await subcatDB.findById(hasCat._id);
      Helper.fMsg(res, "added", updatedData);
    } else {
      next(new Error(" Category does not exist in the database"));
    }
  }
};

const patch = async (req, res) => {
  const childcat = await DB.findById(req.params.id);
  if (childcat) {
    await DB.findByIdAndUpdate(childcat._id, req.body);
    const updateSubCat = await DB.findById(req.params.id);
    Helper.fMsg(res, "updated Sub Catogery", updateSubCat);
  } else {
    next(new Error(" Subcategory Does Not Exist"));
  }
};

const all = async (req, res) => {
  const result = await DB.find();
  Helper.fMsg(res, "sub category list", result);
};

const drop = async (req, res, next) => {
  const childcat = await DB.findById(req.params.id);
  if (childcat) {
    await subcatDB.findByIdAndUpdate(childcat.subcatId, {
      $pull: { childcats: childcat._id },
    });
    await DB.findByIdAndDelete(childcat._id);
    const result = await subcatDB.findById(childcat.subcatId);
    Helper.fMsg(res, "Sub category deleted successfully", result);
  } else {
    next(new Error(" Subcategory Does Not Exist"));
  }
};

module.exports = {
  add,
  patch,
  drop,
  all,
};
