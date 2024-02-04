const router = require("express").Router();
const controller = require("../controllers/user");
const { UserSchema } = require("../utils/Schema");
const {
  validateBody,
  validateToken,
  validateRole,
  hasAnyRole,
  hasAnyPermit,
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
router.post(
  "/remove/role",
  validateToken(),
  validateRole("Owner"),
  validateBody(UserSchema.addRole),
  controller.removeRole
);
router.post(
  "/add/permit",
  validateToken(),
  validateRole("Owner"),
  validateBody(UserSchema.addPermit),
  controller.addPermit
);
router.post(
  "/remove/permit",
  validateToken(),
  validateRole("Owner"),
  validateBody(UserSchema.addPermit),
  controller.removePermit
);
router.post(
  "/add/test",
  validateToken(),
  // hasAnyRole(["Manager"]),
  hasAnyPermit(["Create", "Read"]),
  controller.test
);
router.get("/", controller.all);

router
  .route("/:id")
  .get(controller.get)
  .patch(controller.patch)
  .delete(controller.drop);

module.exports = router;
