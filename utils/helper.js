const bcrypt = require("bcryptjs");

const fMsg = async (res, msg = "success", result = []) => {
  res.status(200).json({
    con: true,
    msg,
    result,
  });
};

module.exports = {
  fMsg,
  encode: (password) => bcrypt.hashSync(password),
};
