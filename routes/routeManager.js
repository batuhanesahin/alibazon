const routeMainPage = require("./mainPageRoute");
menCategoryRoute = require("./menCategoryRoute");
womenCategoryRoute = require("./womenCategoryRoute");
productListRoute = require("./productListRoute");
itemRoute = require("./itemRoute");
searchRoute = require("./searchRoute");
signInRoute = require("./signInRoute");
signUpRoute = require("./signUpRoute");
profileRoute = require("./profileRoute");


module.exports = function (app) {
  app.use("/", routeMainPage);
  app.use("/", menCategoryRoute);
  app.use("/", womenCategoryRoute);
  app.use("/", productListRoute);
  app.use("/", itemRoute);
  app.use("/", searchRoute);
  app.use("/", signInRoute);
  app.use("/", signUpRoute);
  app.use("/", profileRoute);

};
