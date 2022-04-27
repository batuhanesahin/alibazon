module.exports.profileGet = function (req, res,next) {
  var user= req.session.name;
  console.log(req.session.name)
  if (!req.session.userId ) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }
  res.render("profile",{user});
  };