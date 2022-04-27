const routeMainPage = require("./mainPageRoute");
menCategoryRoute = require("./menCategoryRoute");
womenCategoryRoute = require("./womenCategoryRoute");
productListRoute = require("./productListRoute");
itemRoute = require("./itemRoute");
submitRoute = require("./submitRoute");
signInRoute = require("./signInRoute");
signUpRoute = require("./signUpRoute");
profileRoute = require("./profileRoute");
logOutRoute = require("./logOutRoute");


module.exports = function (app) {
  app.use("/", routeMainPage);
  app.use("/", menCategoryRoute);
  app.use("/", womenCategoryRoute);
  app.use("/", productListRoute);
  app.use("/", itemRoute);
  app.use("/", submitRoute);
  app.use("/", signInRoute);
  app.use("/", signUpRoute);
  app.use("/", profileRoute);
  app.use("/", logOutRoute);

};
