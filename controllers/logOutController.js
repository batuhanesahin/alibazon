module.exports.logOut = function (req, res) {
  if (req.session) {
    // delete session object
    req.session.destroy();
    res.redirect("/")
  }
}
