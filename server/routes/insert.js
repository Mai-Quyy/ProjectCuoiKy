const router = require("express").Router();
const ctrls = require("../controller/insertData");

router.post("/", ctrls.insertProduct);
router.post("/cate", ctrls.insertCategory);

module.exports = router;
