const userRouter = require("./user");
const productRouter = require("./product");
const productCategoryRouter = require("./productCategory");
const blogCategoryRouter = require("./blogCategory");
const blog = require("./blog");
const brand = require("./brand");
const coupon = require("./coupon");
const order = require("./order");
const insert = require("./insert");

const { notFound, errorHandler } = require("../middlewares/errHandler");
// const coupon = require("../models/coupon");

// khi ma chay ham init.. thi se chay tu tren xuong duoi,check link api, neu k trung thi se chay tiep
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);
  app.use("/api/prodcategory", productCategoryRouter);
  app.use("/api/blogcategory", blogCategoryRouter);
  app.use("/api/blog", blog);
  app.use("/api/brand", brand);
  app.use("/api/coupon", coupon);
  app.use("/api/order", order);
  app.use("/api/insert", insert);

  app.use(notFound);

  // hung tat ca cac loi phat sinh
  app.use(errorHandler);
};

module.exports = initRoutes;
