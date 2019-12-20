const express = require('express');
const session = require('express-session');

module.exports = function(app){
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUnitialized: true,
    }
    ))
}