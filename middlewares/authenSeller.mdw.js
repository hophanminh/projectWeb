module.exports = function (req, res, next){
    if (req.session.isAuthenticatedSeller === false)
        return res.redirect(`/login?retUrl=${req.originalUrl}`);
    next();
}