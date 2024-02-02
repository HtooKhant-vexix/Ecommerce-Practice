const bcrypt = require("bcryptjs");
const Redis = require("async-redis").createClient();
const jwt = require("jsonwebtoken");

const fMsg = async (res, msg = "success", result = []) => {
  res.status(200).json({
    con: true,
    msg,
    result,
  });
};

module.exports = {
  fMsg,
  compare: async (plainText, hash) => await bcrypt.compareSync(plainText, hash),
  encode: (password) => bcrypt.hashSync(password),
  set: async (id, value) =>
    await Redis.set(id.toString(), JSON.stringify(value)),
  get: async (id) => JSON.parse(await Redis.get(id.toString())),
  drop: async (id) => await Redis.del(id.toString()),
  makeToken: (payload) =>
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" }),
};
