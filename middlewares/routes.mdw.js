module.exports = function(app){
    app.use('/guess',require('../routes/guess/guess.routes'));
    app.use('/admin',require('../routes/admin/admin.routes'));
    app.use('/admin',require('../routes/admin/categories.routes'));
    app.use('/product',require('../routes/product/product.routes'));
    app.use('/user',require('../routes/user/user.routes'));
    app.use('/',require('../routes/routes'));
}