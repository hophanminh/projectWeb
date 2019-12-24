const express = require('express');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const userModel = require('../models/user.model');
const router = express.Router();

router.get('/',(req,res)=>{
    res.render('home',{
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

router.get('/signUp',(req,res)=>{
    res.render('signUp',{
        title: 'Sign Up',
        style: 'style.css'
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

    console.log(entity);

    delete entity.dob;
    delete entity.pass_raw;
    delete entity.pass_rawC;
    delete entity.Sex;
    
    console.log(entity);
    const result = await userModel.register(entity);
    
    res.render('login',{
            layout: false,
            title:"Log In",
            style: "style.css"
        });
})

router.get('/login',(req,res)=>{
    res.render('login',{
        layout: false,
        title:"Log In",
        style: "style.css"
    });
})

router.post('/login',async(req,res)=>{
    const user = await userModel.singleByUsername(req.body.username);
    
    if(user === null)
        throw new Error('Invalid username or password');

    const authe = bcryptjs.compareSync(req.body.password, user.Password);
    
    console.log(authe);

    if(authe === false){
        return res.render('login',{
            layout: false,
            title:"Log In",
            style: "style.css"
        });
    }

    delete user.Password;
    req.session.isAuthenticated = true;
    req.session.authUser = user;

    console.log(user);

    // const url = req.query.retUrl || '/';
    const url = req.query.retUrl || '/';
    res.redirect(url);
    
})
router.post('/logout',(req,res)=>{
    req.session.isAuthenticated = false;
    req.session.authUser = null;
    res.redirect(req.headers.referer);
    
});

router.get('/forgetPass',(req,res)=>{
    res.render('forgetPass',{
        title: 'Forget pass',
        style: "home.css"
    })
})
router.post('/forgetPass',async (req,res)=>{
    console.log(req.body);
    const check = await userModel.singleByEmail(req.body.Email);
    console.log(check);
    if(check === false)
        throw new Error('Invalid username or password');

    console.log(check);

    const N = 10;
    const hash = bcryptjs.hashSync(check.PhoneNo,N);

    delete check.Username;
    delete check.Password;
    delete check.Type;
    delete check.Fname;
    delete check.Lname;
    delete check.DoB;
    delete check.Street;
    delete check.District;
    delete check.City;
    delete check.Email;
    delete check.PhoneNo;
    delete check.Point;

    const entity = check
    entity.Password = hash;
    console.log(entity);
    const result = await userModel.changePass(entity);

    res.redirect('/login');
})

router.get('/payment',(req,res)=>{
    res.render('productViews/payment',{
        title: 'Payment',
        style: 'style.css',
    })
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