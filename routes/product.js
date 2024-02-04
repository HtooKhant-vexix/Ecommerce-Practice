const router = require("express").Router();
const controller = require("../controllers/product");
const { saveFiles } = require("../utils/gallery");

router.post("/", saveFiles, controller.add);
router.get("/", controller.all);
router.get("/:page", controller.paginate);
router.get("/:page/:id", controller.productByCat);
router.get("/tag/:page/:id", controller.productByTag);

router.route("/:id").patch(saveFiles, controller.patch).delete(controller.drop);

module.exports = router;
