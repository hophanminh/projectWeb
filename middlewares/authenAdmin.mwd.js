module.exports = function (req, res, next){
    if (req.session.isAuthenticatedAdmin === false)
        return res.redirect(`/loginAdmin?retUrl=${req.originalUrl}`);
    next();
}