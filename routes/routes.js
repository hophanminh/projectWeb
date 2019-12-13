const express = require('express');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const userModel = require('../models/user.model');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('homeGuess',{
        title:"Home",
        style: "style.css"
    });
})

router.get('/FAQ',(req,res)=>{
    res.render('FAQ',{
        title:"FAQ",
        style: "style.css"
    });
})

router.get('/login',(req,res)=>{
    res.render('login',{
        title:"Log In",
        style: "style.css"
    });
})

router.get('/signUp',(req,res)=>{
    res.render('signUp',{
        title: 'Sign Up',
        style: 'style.css'
    })
})

router.get('/payment',(req,res)=>{
    res.render('productViews/payment',{
        title: 'Payment',
        style: 'style.css',
    })
})

router.post('/signUp',async(req,res)=>{
    console.log(req.body);
    const N = 10;
    const hash = bcryptjs.hashSync(req.body.pass_raw,N);
    const dob = moment(req.body.dob,'DD/MM/YYYY').format('YYYY-MM-DD');
    
    const entity = req.body;
    entity.Password = hash;
    entity.Point = 0;
    entity.DoB = dob;
    
    delete entity.dob;
    delete entity.pass_raw;
    delete entity.pass_rawC;
    delete entity.Sex;

    console.log(entity);
    const result = await userModel.register(entity);

    res.render('login',{
        title:"Log In",
        style: "style.css"
    });
})

router.get('/contact',(req,res)=>{
    res.render('contact',{
        title: 'contact',
        style: 'style.css'
    })
})

router.get('/error',(req,res)=>{
    res.render('error',{
        title: 'Error',
        style: 'style.css'
    })
})


module.exports = router;