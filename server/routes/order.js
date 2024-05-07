const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/veryfyToken");
const ctrls = require("../controller/order");

router.post("/", verifyAccessToken, ctrls.createOrder);
// router.put("/status/", verifyAccessToken, isAdmin, ctrls.updateStatus);
// router.get("/", verifyAccessToken, ctrls.getUserOrder);
// router.get("/admin/", verifyAccessToken, idAdmin, ctrls.getOrder);

module.exports = router;
