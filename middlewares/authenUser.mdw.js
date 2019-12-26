module.exports = function (req, res, next){
    if (req.session.isAuthenticated === false || req.session.isAuthenticatedAdmin === false)
      return res.redirect(`/login?retUrl=${req.originalUrl}`);
    next();
  }
