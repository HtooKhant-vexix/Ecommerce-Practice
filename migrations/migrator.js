const Helper = require("../utils/helper");
const fs = require("fs");
const UserDB = require("../models/user");

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

const backup = async () => {
  const data = await UserDB.find();
  fs.writeFileSync("./migrations/backup/users.json", JSON.stringify(data));
  console.log("User backuped!");
};

module.exports = {
  migrate,
  backup,
};
