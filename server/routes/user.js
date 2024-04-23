const router = require("express").Router();
const ctrls = require("../controller/user");
router.post("/register", ctrls.register);
router.put("/address", [veryfyAccessToken], ctrls.updateUserAddress);
router.put("/cart", [veryfyAccessToken], ctrls.updateCart);

module.exports = router;
