module.exports = function (req,res,next){
    if (req.session.isAuthenticated === false)
        return res.redirect(`/login?retUrl=${req.originalUrl}`);
    else if(req.session.authUser.Type != 3)
        return res.redirect(`/login?retUrl=${req.originalUrl}`);
  next();
  }