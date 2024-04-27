const express = require("express");
require("dotenv").config();
const dbconect = require("./config/dbconnect");
const initRoutes = require("./routes");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dbconect();
initRoutes(app);
app.listen(port, () => {
  console.log("Server running on the port" + port);
});
