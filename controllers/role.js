const { findById } = require("../models/role");
const DB = require("../models/role");
const permitDB = require("../models/permit.js");
const Helper = require("../utils/helper.js");

const add = async (req, res) => {
  let dbRole = await DB.findOne({ name: req.body.name });
  if (dbRole) {
    next(new Error("Role is already exit"));
  } else {
    const result = await new DB(req.body).save();
    Helper.fMsg(res, "Successfully added role", result);
  }
};

const all = async (req, res) => {
  const result = await DB.find().populate("permit", "-__v");
  Helper.fMsg(res, "All Role", result);
};

const get = async (req, res) => {
  const id = req.params.id;
  const result = await DB.findById(id).select("-__v");
  if (result) {
    Helper.fMsg(res, "Single Role", result);
  } else {
    next(new Error("No Role with this ID"));
  }
};

const patch = async (req, res) => {
  const id = req.params.id;
  const dbRole = await DB.findById(id).select("-__v");
  if (dbRole) {
    await DB.findByIdAndUpdate(dbRole._id, req.body);
    const result = await DB.findById(dbRole._id);
    Helper.fMsg(res, "Updated", result);
  } else {
    next(new Error("No Role with this ID"));
  }

  //   res.send({ con: true, msg: "Role Updated!", result });
};

const drop = async (req, res) => {
  const id = req.params.id;
  const dbRole = await DB.findById(id).select("-__v");
  if (dbRole) {
    const result = await DB.findByIdAndDelete(id);
    Helper.fMsg(res, "Deleted");
  } else {
    next(new Error("No Role with this ID"));
  }

  //   res.send({ con: true, msg: "Role Deleted!", result });
};

const RoleAddPermit = async (req, res) => {
  const dbRole = await DB.findById(req.body.roleId);
  const dbPermit = await permitDB.findById(req.body.permitId);
  if (dbRole && dbPermit) {
    await DB.findByIdAndUpdate(req.body.roleId, {
      $push: { permit: dbPermit._id },
    });
    const result = await DB.findById(dbRole._id);
    Helper.fMsg(res, "Permit Added", result);
  } else {
    next(new Error("No Role of Permit with this ID"));
  }
};

const RoleRemovePermit = async (req, res) => {
  const dbRole = await DB.findById(req.body.roleId);
  const dbPermit = await permitDB.findById(req.body.permitId);
  if (dbRole && dbPermit) {
    await DB.findByIdAndUpdate(req.body.roleId, {
      $pull: { permit: dbPermit._id },
    });
    const result = await DB.findById(dbRole._id);
    Helper.fMsg(res, "Permit Removed", result);
  } else {
    next(new Error("No Role of Permit with this ID"));
  }
};

module.exports = {
  add,
  all,
  get,
  patch,
  drop,
  RoleAddPermit,
  RoleRemovePermit,
};
