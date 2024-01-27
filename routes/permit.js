const router = require("express").Router();
const controller = require("../controllers/permit");
const { PermitSchema, AllSchema } = require("../utils/Schema");
const { validateBody, validateParam } = require("../utils/validator");

router.post("/", validateBody(PermitSchema.add), controller.add);
router.get("/", controller.all);

router
  .route("/:id")
  .get(validateParam(AllSchema.id, "id"), controller.get)
  .patch(validateParam(AllSchema.id, "id"), controller.patch)
  .delete(validateParam(AllSchema.id, "id"), controller.drop);

module.exports = router;
