const router = require("express").Router();
const ctrls = require("../controller/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/veryfyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createProduct);

router.get("/", ctrls.getProducts);
router.put("/:pid", [verifyAccessToken, isAdmin], ctrls.updateProduct);
router.delete("/:pid", [verifyAccessToken, isAdmin], ctrls.deleteProduct);
router.get("/:pid", ctrls.getProduct);

module.exports = router;
