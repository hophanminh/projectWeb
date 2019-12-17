const express = require('express');
const morgan = require('morgan');
const config = require('./config/default.json');

require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));
app.use(express.static('public'));

const categoryModel = require('./models/categories.model');
app.use(async(req,res,next)=>{
  const rows = await categoryModel.allCategory();
  console.log(rows);
  res.locals.lcCategory = rows;
  next();
})

require('./middlewares/engine.mdw')(app);
require('./middlewares/routes.mdw')(app);

//Need to place at last of app.js. Do not move it

require('./middlewares/errorHandle.mdw')(app);
app.listen(config.port_server.PORT,()=>{
    console.log(`Web Server is running at http://localhost:${config.port_server.PORT}`);
})