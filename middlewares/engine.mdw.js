const exhbs = require('express-handlebars');
const hbs_section = require('express-handlebars-sections')
const path = require('path');
const moment = require('moment')

module.exports=function(app){
    app.engine('hbs',exhbs({
        defaultLayout: '../layouts/HeaderFooter.hbs',
        layoutsDir: path.join(__dirname, '../views/layouts'),
        helpers:{
            section: hbs_section(),
            formatDate: value => moment(value).format('LL'),
        }
    }));
    app.set('view engine','hbs');  
}