const router = require("express").Router();
const ctrls = require("../controller/blogCategory");
const { verifyAccessToken, isAdmin } = require("../middlewares/veryfyToken");

router.post("/", [verifyAccessToken, isAdmin], ctrls.createCategory);
router.get("/", ctrls.getCategories);
router.put("/:bcid", [verifyAccessToken, isAdmin], ctrls.updateCategory);
router.delete("/:bcid", [verifyAccessToken, isAdmin], ctrls.deleteCategory);

module.exports = router;
