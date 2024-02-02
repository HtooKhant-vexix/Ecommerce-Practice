const router = require("express").Router();
const controller = require("../controllers/user");
const { UserSchema } = require("../utils/Schema");
const {
  validateBody,
  validateToken,
  validateRole,
} = require("../utils/validator");

router.post(
  "/register",
  validateBody(UserSchema.register),
  controller.register
);
router.post("/", validateBody(UserSchema.login), controller.login);
router.post(
  "/add/role",
  validateToken(),
  validateRole("Owner"),
  validateBody(UserSchema.addRole),
  controller.addRole
);
router.get("/", controller.all);

router
  .route("/:id")
  .get(controller.get)
  .patch(controller.patch)
  .delete(controller.drop);

module.exports = router;
