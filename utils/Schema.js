const Joi = require("joi");
const { register, addPermit } = require("../controllers/user");

module.exports = {
  PermitSchema: {
    add: Joi.object({
      name: Joi.string().required(),
    }),
  },
  UserSchema: {
    register: Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().required(),
      phone: Joi.string().min(7).max(11).required(),
      password: Joi.string().min(6).required(),
    }),
    login: Joi.object({
      phone: Joi.string().min(7).max(11).required(),
      password: Joi.string().min(6).required(),
    }),
    addRole: Joi.object({
      userId: Joi.string()
        .regex(/^[0-9a-fA-f]{24}$/)
        .required(),
      roleId: Joi.string()
        .regex(/^[0-9a-fA-f]{24}$/)
        .required(),
    }),
    addPermit: Joi.object({
      userId: Joi.string()
        .regex(/^[0-9a-fA-f]{24}$/)
        .required(),
      permitId: Joi.string()
        .regex(/^[0-9a-fA-f]{24}$/)
        .required(),
    }),
  },
  RoleSchema: {
    add: Joi.object({
      roleId: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
      permitId: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
    }),
  },
  AllSchema: {
    id: Joi.object({
      id: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
    }),
  },
};
