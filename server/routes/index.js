const userRouter = require("./user");
const { notFound, errorHandler } = require("../middlewares/errHandler");
const order = require("./order");
// khi ma chay ham init.. thi se chay tu tren xuong duoi,check link api, neu k trung thi se chay tiep
const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/order", order);

  app.use(notFound);

  // hung tat ca cac loi phat sinh
  app.use(errorHandler);
};

module.exports = initRoutes;
