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
      if (!req.headers.authorization) {
        next(new Error("Token does not exit"));
        return;
      }
      let token = req.headers.authorization.split(" ")[1];
      if (token) {
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
  hasAnyRole: (roles) => {
    return async (req, res, next) => {
      let bol = false;
      // console.log(req);
      for (let i = 0; i < roles.length; i++) {
        let hasRole = req.user.roles.find((ro) => ro.name == roles[i]);
        if (hasRole) {
          bol = true;
          break;
        }
      }
      if (bol) next();
      else next(new Error("You are not authorised to Perform this Action"));
    };
  },
  hasAnyPermit: (permits) => {
    return async (req, res, next) => {
      let bol = false;
      // console.log(req);
      for (let i = 0; i < permits.length; i++) {
        let hasPermit = req.user.permits.find((ro) => ro.name == permits[i]);
        if (hasPermit) {
          bol = true;
          break;
        }
      }
      if (bol) next();
      else next(new Error("You are not authorised to Perform this Action"));
    };
  },
};
