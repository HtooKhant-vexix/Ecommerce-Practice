const { findById } = require("../models/user");
const DB = require("../models/user");
const roleDB = require("../models/role");
const Helper = require("../utils/helper");
const PermitDB = require("../models/permit");

const register = async (req, res) => {
  const dbEmailUser = await DB.findOne({ email: req.body.email });
  if (dbEmailUser) {
    next(new Error("Email is already taken"));
  }
  const dbPhoneUser = await DB.findOne({ email: req.body.phone });
  if (dbPhoneUser) {
    next(new Error("Phone is already taken"));
  }
  let data = new DB(req.body);
  data.password = Helper.encode(req.body.password);
  const result = await data.save();
  Helper.fMsg(res, "User added", result);
};

const login = async (req, res, next) => {
  const PhoneUser = await DB.findOne({ phone: req.body.phone })
    .populate("roles permits")
    .select("-__v");
  // console.log(req.body.password);
  if (PhoneUser) {
    if (Helper.compare(req.body.password, PhoneUser.password)) {
      let user = PhoneUser.toObject();
      delete user.password;
      user.token = Helper.makeToken(user);
      Helper.set(user._id, user);
      Helper.fMsg(res, "Login Successful", user);
    } else {
      next(new Error("Password is wrong"));
    }
  } else {
    next(new Error("Credential error"));
  }
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

const addRole = async (req, res, next) => {
  const dbUser = await DB.findById(req.body.userId);
  const dbRole = await roleDB.findById(req.body.roleId);
  // console.log(dbRole);
  const foundRole = dbUser.roles?.find((rid) => rid?.equals(dbRole._id));
  if (foundRole) {
    return next(new Error("This User already has this Role"));
  } else {
    await DB.findByIdAndUpdate(dbUser._id, { $push: { roles: dbRole._id } });
    let user = await DB.findById(dbUser._id);
    Helper.fMsg(res, "role added", user);
  }
};

const removeRole = async (req, res, next) => {
  const dbUser = await DB.findById(req.body.userId);

  const foundRole = dbUser.roles?.find((rid) => rid?.equals(req.body.roleId));
  if (foundRole) {
    await DB.findByIdAndUpdate(dbUser._id, {
      $pull: { roles: req.body.roleId },
    });
    let user = await DB.findById(dbUser._id);
    Helper.fMsg(res, "role remove", user);
  } else {
    return next(new Error("Role does not exit"));
  }
};

const addPermit = async (req, res, next) => {
  const dbUser = await DB.findById(req.body.userId);
  const dbPermit = await PermitDB.findById(req.body.permitId);
  // console.log(dbRole);
  const foundRole = dbUser.permits?.find((rid) => rid?.equals(dbPermit._id));
  if (foundRole) {
    return next(new Error("This User already has this permit"));
  } else {
    await DB.findByIdAndUpdate(dbUser._id, {
      $push: { permits: dbPermit._id },
    });
    let user = await DB.findById(dbUser._id);
    Helper.fMsg(res, "permit added", user);
  }
};

const removePermit = async (req, res, next) => {
  const dbUser = await DB.findById(req.body.userId);

  const foundPermit = dbUser.permits?.find((rid) =>
    rid?.equals(req.body.permitId)
  );
  if (foundPermit) {
    await DB.findByIdAndUpdate(dbUser._id, {
      $pull: { permits: req.body.permitId },
    });
    let user = await DB.findById(dbUser._id);
    Helper.fMsg(res, "permit remove", user);
  } else {
    return next(new Error("permit does not exit"));
  }
};

const test = async (req, res, next) => {
  console.log("work");
};

module.exports = {
  test,
  register,
  all,
  get,
  login,
  patch,
  drop,
  addRole,
  removeRole,
  addPermit,
  removePermit,
};
