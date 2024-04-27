const router = require("express").Router();
const ctrls = require("../controller/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/veryfyToken");
router.post("/register", ctrls.register);
router.post("/login", ctrls.login);
router.get("/current", verifyAccessToken, ctrls.getCurrent);
router.post("/refreshtoken", ctrls.refreshAccessToken);
router.get("/logout", ctrls.logout);
router.get("/forgotpassword", ctrls.forgotPassword);
// router.use(verifyAccessToken);
router.get("/", [verifyAccessToken, isAdmin], ctrls.getUsers);
router.delete("/", [verifyAccessToken, isAdmin], ctrls.deleteUsers);
router.put("/current", [verifyAccessToken], ctrls.updateUsers);
router.put("/:uid", [verifyAccessToken, isAdmin], ctrls.updateUsersByAdmin);

module.exports = router;

// CRUD

// CREATE (POST) +PUT - body
// GET + DELETE - query // ?asdas &asdasdd
