module.exports.login= function (req, res, next){
    if (req.session && req.session.userId) {
      return res.redirect('/auth/profile');
    }
    return next();
  }