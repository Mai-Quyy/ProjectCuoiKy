const router = require("express").Router();
const { verifyAccessToken, idAdmin } = require("../middlewares/");
const ctrls = require("../controller/order");

router.post("/", verifyAccessToken, ctrls.createOrder);
router.post("/status/", verifyAccessToken, isAdmin, ctrls.updateStatus);
router.post("/", verifyAccessToken, ctrls.getUserOrder);
router.post("/admin/", verifyAccessToken, idAdmin, ctrls.getOrder);

module.exports = router;
