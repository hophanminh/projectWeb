const express = require('express');
const morgan = require('morgan');
const numeral = require('numeral');
require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.static('public'));


require('./middlewares/engine.mdw')(app);
require('./middlewares/routes.mdw')(app);

//Need to place at last of app.js. Do not move it

require('./middlewares/errorHandle.mdw')(app);
app.listen(3000,()=>{
    console.log('Web Server is running at http://localhost:3000');
})