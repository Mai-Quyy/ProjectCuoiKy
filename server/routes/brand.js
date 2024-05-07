const router = require("express").Router();
const ctrls = require("../controller/brand");
const { verifyAccessToken, isAdmin } = require("../middlewares/veryfyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBrand);
router.get("/", ctrls.getBrand);
router.put("/:bcid", [verifyAccessToken, isAdmin], ctrls.updatedBrand);
router.delete("/:bcid", [verifyAccessToken, isAdmin], ctrls.deleteBrand);

module.exports = router;
