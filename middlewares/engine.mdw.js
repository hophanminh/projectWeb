const exhbs = require('express-handlebars');
const path = require('path');
const moment = require('moment')

module.exports=function(app){
    app.engine('hbs',exhbs({
        defaultLayout: '../layouts/HeaderFooter.hbs',
        layoutsDir: path.join(__dirname, '../views/layouts'),
        helper:{
            formatDate: value => moment(value).format('LL'),
        }
    }));
    
    app.set('view engine','hbs');
}