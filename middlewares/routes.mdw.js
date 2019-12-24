const restrictUser = require('../middlewares/authenUser.mdw');
const restrictAdmin = require('../middlewares/authenAdmin.mwd');

module.exports = function(app){
    app.use('/guess',require('../routes/guess/guess.routes'));
    app.use('/admin',restrictAdmin,require('../routes/admin/admin.routes'));
    app.use('/category',require('../routes/categories/categories.routes'));
    app.use('/product',require('../routes/product/product.routes'));
    app.use('/user',restrictUser,require('../routes/user/user.routes'));
    app.use('/seller',require('../routes/seller/seller.routes'));
    app.use('/bidder',require('../routes/bidder/bidder.routes'));
    app.use('/',require('../routes/routes'));
}