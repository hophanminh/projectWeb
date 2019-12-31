const categoryModel = require('../models/categories.model');

module.exports = function(app){
    app.use(async(req,res,next)=>{

      const rows = await categoryModel.allCategory();
            
      res.locals.lcCategory = rows;

      if (typeof (req.session.isAuthenticated) === 'undefined') {
        req.session.isAuthenticated = false;
      }

      res.locals.isAuthenticated = req.session.isAuthenticated;
      res.locals.authUser = req.session.authUser;
      res.locals.isAuthenticatedAdmin = req.session.isAuthenticatedAdmin;
      res.locals.isAuthenticatedSeller = req.session.isAuthenticatedSeller;
      
      next();
    })
}
