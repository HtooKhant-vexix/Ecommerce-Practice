const Helper = require("../utils/helper");
const fs = require("fs");
const UserDB = require("../models/user");
const RoleDB = require("../models/role");
const PermitDB = require("../models/permit");

const migrate = async () => {
  let data = fs.readFileSync("./migrations/backup/users.json");
  let users = JSON.parse(data);
  users.forEach(async (user) => {
    user.password = Helper.encode(user.password);
    let result = await new UserDB(user).save();
    console.log(result);
  });
  // console.log(users);
};

const rpMigrate = async () => {
  let data = fs.readFileSync("./migrations/rolepermits.json");
  const rp = await JSON.parse(data);
  rp.roles.forEach(async (role) => {
    const result = await new RoleDB(role).save();
    console.log("==rr==================================");
    console.log(result);
    console.log("====================================");
  });
  rp.permits.forEach(async (permit) => {
    const result = await new PermitDB(permit).save();
    console.log("==ppp==================================");
    console.log(result);
    console.log("====================================");
  });
};

const backup = async () => {
  const data = await UserDB.find();
  fs.writeFileSync("./migrations/backup/users.json", JSON.stringify(data));
  console.log("User backuped!");
};

const addOwnerRole = async () => {
  const dbOwner = await UserDB.findOne({ phone: "09955209427" });
  const userRole = await RoleDB.findOne({ name: "Owner" });
  await UserDB.findByIdAndUpdate(dbOwner._id, {
    $push: { roles: userRole._id },
  });
};

module.exports = {
  migrate,
  backup,
  rpMigrate,
  addOwnerRole,
};
