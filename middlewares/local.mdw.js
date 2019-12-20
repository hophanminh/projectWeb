const categoryModel = require('../models/categories.model');

module.exports = function(app){
    app.use(async(req,res,next)=>{
      const rows = await categoryModel.allCategory();
      console.log(rows);
      res.locals.lcCategory = rows;

      if (typeof (req.session.isAuthenticated) === 'undefined') {
        req.session.isAuthenticated = false;
      }
      res.locals.isAuthenticated = req.session.isAuthenticated;
      res.locals.authUser = req.session.authUser;
      app.locals.autheUser = req.session.authUser;
      next();
    })
}
