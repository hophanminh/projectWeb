const express = require('express');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('homeGuess',{
        title: 'Home Guess',
        style: 'style.css'
    });
});


router.get('/signUp',(req,res)=>{
    res.render('signUp',{
        title:"Sign Up",
        style: 'style.css'
    });
});

router.get('/logIn',(req,res)=>{
    res.render('login',{
        title: 'Log In',
        style:'style.css'
    });
});

module.exports = router;