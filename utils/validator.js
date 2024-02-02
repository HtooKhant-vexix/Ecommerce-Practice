const jwt = require("jsonwebtoken");
const Helper = require("../utils/helper");
module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      let result = schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0]));
      } else {
        next();
      }
    };
  },
  validateParam: (schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      let result = schema.validate(obj);
      if (result.error) {
        next(new Error(result.error.details[0]));
      } else {
        next();
      }
    };
  },
  validateToken: () => {
    return async (req, res, next) => {
      let token = req.headers.authorization.split(" ")[1];
      let decode = jwt.verify(token, process.env.SECRET_KEY);
      if (decode) {
        const user = await Helper.get(decode._id);
        if (user) {
          req.user = user;
          next();
        } else {
          next(new Error("Invalid Token"));
        }
      } else {
        next(new Error("Invalid Token"));
      }
    };
  },
  validateRole: (role) => {
    return async (req, res, next) => {
      let found = req.user.roles.find((e) => e.name == role);
      if (found) {
        next();
      } else {
        next(new Error(`Not Authorized to perform this action`, 403));
      }
      // console.log(found);
    };
  },
};
