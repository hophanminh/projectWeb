module.exports = function(app){
    app.use('/guess',require('../routes/guess/guess.routes'));
    app.use('/admin',require('../routes/admin/admin.routes'));
    app.use('/admin',require('../routes/admin/categories.routes'));
    app.use('/',require('../routes/routes'));
}