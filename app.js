const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require('dotenv').config()
Sentry = require("@sentry/node");
Tracing = require("@sentry/tracing");

// Sentry Error Tracking
Sentry.init({
dsn: "https://a44fd4dab3824bc89398da3fae055f2e@o1187696.ingest.sentry.io/6307538",
integrations: [
  new Sentry.Integrations.Http({ tracing: true }),
  new Tracing.Integrations.Express({ app }),
],
  tracesSampleRate: 1.0,
});
 
app.use(Sentry.Handlers.errorHandler());
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "css")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  cookie: {maxAge: 60*60*24*1000},
  secret: "treehouse loves you",
  resave: false,
  saveUninitialized: true
}));

app.use(function onError(err, req, res, next) {
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});


app.use(function (req,res,next){
  res.locals.currentUser = req.session.userId;
  next();
})

app.get("/logout", (req,res) => {
  if (req.session) {
     //delete session object
    req.session.destroy();
    res.redirect("/")
  }
})


require("./routes/routeManager")(app);


app.listen(process.env.PORT || 3000);