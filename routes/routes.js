const express = require('express');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const {check, validationResult} = require('express-validator');
const userModel = require('../models/user.model');
const adminModel = require('../models/admin.model');
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
        style: "style.css",
        errors: req.session.errors,
        saveForm: req.session.saveForm,
    });
    req.session.errors = null;
    req.session.saveForm=null;
})

router.get('/signUp',(req,res)=>{
    res.render('signUp',{
        title: 'Sign Up',
        style: 'style.css',
        js: 'signUp.js',
        errors: req.session.errors,
        saveForm: req.session.saveForm
    })
    req.session.errors = null;
    req.session.saveForm = null;
})


router.post('/signUp',[
    check('Username','Username is already exist')
    .not().isEmpty()
    .isLength({min: 6}).withMessage("Username has at least 6 characters")
    .custom(async value =>{
        return id = await userModel.getIDByUsername(value).then(result =>{
            if(result.length>0){
                return Promise.reject('Username is already exist');
            }
        })
    }),
    check('Email','email is already exist')
    .isEmail()
    .normalizeEmail()
    .custom(async value =>{
        return email = await userModel.getIDByEmail(value).then(result => {
            if(result.length > 0){
                return Promise.reject('Email is already exist');
            }
        })
    }),
    check('pass_raw')
    .notEmpty()
    .isLength({min: 6}).withMessage('Pass has at least 6 character')
    .custom((value,{req})=>{
        if(value !== req.body.pass_rawC){
            throw new Error('Pass not match')
        }
        else return value;
    })
    ],async(req,res)=>{
    var errors = validationResult(req).array();
    if(errors.length > 0){
        req.session.errors = errors;
        req.session.saveForm = req.body;
        res.redirect('/signUp');
    }
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
    console.log(req.body);
    const user = await userModel.singleByUsername(req.body.username);
    const bidTime = await userModel.countBid(req.body.username);

    user.countBid = bidTime;

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
    req.session.isAuthenticatedAdmin = false;
    req.session.authUser = user;

    console.log(user);

    // const url = req.query.retUrl || '/';
    const url = req.query.retUrl || '/';
    res.redirect(url);
    
})

router.get('/loginAdmin',(req,res)=>{
    res.render('loginAdmin',{
        layout: false,
        title:"Log In",
        style: "style.css"
    });
})

router.post('/loginAdmin',async(req,res)=>{
    const user = await adminModel.singleByAdmin(req.body.username);
    
    if(user === null)
        throw new Error('Invalid username or password');

    const authe = bcryptjs.compareSync(req.body.password, user.Password);
    
    console.log(authe);

    if(authe === false){
        return res.render('loginAdmin',{
            layout: false,
            title:"Log In",
            style: "style.css"
        });
    }

    delete user.Password;
    req.session.isAuthenticated = true;
    req.session.isAuthenticatedAdmin = true;
    req.session.authUser = user;

    console.log(user);

    // const url = req.query.retUrl || '/';
    const url = req.query.retUrl || '/';
    res.redirect(url);
    
})

router.post('/logout',(req,res)=>{
    req.session.isAuthenticated = false;
    req.session.isAuthenticatedAdmin=false;
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