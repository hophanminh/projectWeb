const express = require('express');
const exhbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.engine('hbs',exhbs({
    defaultLayout: 'HeaderFooter.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}));


app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('homeGuess',{
        title:"Guess Page",
        style: "style.css"
    });
})

app.get('/FAQ',(req,res)=>{
    res.render('FAQ',{
        title:"FAQ",
        style: "style.css"
    });
})

app.get('/login',(req,res)=>{
    res.render('login',{
        title:"Log In",
        style: "style.css"
    });
})

app.use('/admin',require('./routes/admin/admin.routes'));
app.use('/guess',require('./routes/guess/guess.routes'));

app.listen(3000,()=>{
    console.log('Web Server is running at http://localhost:3000');
})