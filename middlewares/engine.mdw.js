const exhbs = require('express-handlebars');
const hbs_section = require('express-handlebars-sections')
const path = require('path');
const moment = require('moment')
const config = require('../config/default.json');

module.exports=function(app){
    app.engine('hbs',exhbs({
        defaultLayout: '../layouts/HeaderFooter.hbs',
        layoutsDir: path.join(__dirname, '../views/layouts'),
        helpers:{
            section: hbs_section(),
            formatDate: value => moment(value).format('LL'),
            lastProduct: function (dateStart, dateEnd){
                const now = moment().format();
                const end = moment(end,'YYYY-MM-DD h:mm:ss')
                const period = end - now;
            },
            recommendMoney: value => {
                const newMoney = +value +1;
                return newMoney; 
            },
            mask: word=>{
                const length = config.maskedString.maskedLetter;
                if (word.length <= length) {
                    return word
                } 
                else {
                    var masked = word.substring(0, word.length - length).replace(/[a-z\d]/gi,"*") + 
                    word.substring(word.length - length, word.length)
                    return masked;
                }
            },
            if_equal: function(value1, value2, opts){
                if(value1 == value2)
                    return opts.fn(this);
                else
                    return opts.inverse(this);
            },
            
        }
    }));
    app.set('view engine','hbs');  
}