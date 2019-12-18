const categoryModel = require('../models/categories.model');

module.exports = function(app){
    app.use(async(req,res,next)=>{
      const rows = await categoryModel.allCategory();
      console.log(rows);
      res.locals.lcCategory = rows;
      next();
    })
}
