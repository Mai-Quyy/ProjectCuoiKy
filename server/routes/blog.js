const router = require("express").Router();
const { verifyAccessToken, isAdmin } = require("../middlewares/veryfyToken");
const ctrls = require("../controller/blog");
const uploader = require("../config/clouddinaryconfig");
router.get("/", ctrls.getBlogs);
router.post("/", [verifyAccessToken, isAdmin], ctrls.createNewBlog);
router.get("/one/:bid", ctrls.getBlog);
router.put("/likes/:bid", [verifyAccessToken], ctrls.likeBlog);
router.put(
  "/image/:bid",
  [verifyAccessToken, isAdmin],
  uploader.single("image"),
  ctrls.uploadImageBlog
);
router.put("/dislike/:bid", [verifyAccessToken], ctrls.dislikeBlog);
router.put("/:bid", [verifyAccessToken, isAdmin], ctrls.updateBlog);
router.delete("/:bid", [verifyAccessToken, isAdmin], ctrls.deleteBlog);

module.exports = router;
