const router = require("express").Router();
const controller = require("../controllers/role");
const { PermitSchema, AllSchema, RoleSchema } = require("../utils/Schema");
const { validateBody, validateParam } = require("../utils/validator");

router.get("/", controller.all);
router.post("/", validateBody(PermitSchema.add), controller.add);
router.post(
  "/add/permit",
  validateBody(RoleSchema.add),
  controller.RoleAddPermit
);
router.post(
  "/remove/permit",
  validateBody(RoleSchema.add),
  controller.RoleRemovePermit
);

router
  .route("/:id")
  .get(validateParam(AllSchema.id, "id"), controller.get)
  .patch(
    validateParam(AllSchema.id, "id"),
    validateBody(PermitSchema.add),
    controller.patch
  )
  .delete(validateParam(AllSchema.id, "id"), controller.drop);

module.exports = router;
