const router = require("express").Router();
const controller = require("../controllers/user");
const { UserSchema } = require("../utils/Schema");
const { validateBody } = require("../utils/validator");

router.post(
  "/register",
  validateBody(UserSchema.register),
  controller.register
);
router.get("/", controller.all);

router
  .route("/:id")
  .get(controller.get)
  .patch(controller.patch)
  .delete(controller.drop);

module.exports = router;
