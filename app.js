const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const config = require('./config/default.json');

require('express-async-errors');

const app = express();

app.use(morgan('dev'));
app.use(session({
  secret: 'one two three four five',
  saveUninitialized: false,
  resave: false
}));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
  }));
app.use(express.static('public'));

//Local
require('./middlewares/local.mdw')(app);
require('./middlewares/session.mdw')(app);

require('./middlewares/engine.mdw')(app);
require('./middlewares/routes.mdw')(app);

//Need to place at last of app.js. Do not move it

require('./middlewares/errorHandle.mdw')(app);
app.listen(config.port_server.PORT,()=>{
    console.log(`Web Server is running at http://localhost:${config.port_server.PORT}`);
})