const exhbs = require('express-handlebars');
const path = require('path');

module.exports=function(app){
    app.engine('hbs',exhbs({
        defaultLayout: '../layouts/HeaderFooter.hbs',
        layoutsDir: path.join(__dirname, '../views/layouts')
    }));
    
    app.set('view engine','hbs');
}