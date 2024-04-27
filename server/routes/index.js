const userRouter = require("./user");
const productRouter = require("./product");

const { notFound, errorHandler } = require("../middlewares/errHandler");

// khi ma chay ham init.. thi se chay tu tren xuong duoi,check link api, neu k trung thi se chay tiep
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/product", productRouter);

  app.use(notFound);

  // hung tat ca cac loi phat sinh
  app.use(errorHandler);
};

module.exports = initRoutes;
