const express = require('express');
const bcryptjs = require('bcryptjs');
const moment = require('moment');
const {check, validationResult} = require('express-validator');
const userModel = require('../models/user.model');
const adminModel = require('../models/admin.model');
const productModel = require('../models/product.model');
const router = express.Router();
const config = require('../config/default.json');
const bodyParser = require('body-parser');
const request = require('request');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended : false}));

router.get('/',async(req,res)=>{
    if(res.locals.isAuthenticatedAdmin == true){
        res.render('home',{
            layout: 'adminLayout.hbs',
            title:"Home",
            style: "style.css"
        });
    }
    else {
        const highestPrice = await productModel.topHighestPrice();
        const topExpire = await productModel.topExpire();
        const mostBid = await productModel.topMostBid();

        if(highestPrice.length!=0){
            for(i=0;i< highestPrice.length;i++){
                if(i === 0){
                    highestPrice[i].isActive = true;
                }
                else {
                    highestPrice[i].isActive = false;
                }

        }}
        if(topExpire.length!=0){
            for(i=0;i< topExpire.length;i++){
                if(i === 0){
                    topExpire[i].isActive = true;
                }
                else {
                    topExpire[i].isActive = false;
                }

        }}
        if(mostBid.length != 0){
            for(i=0;i< mostBid.length;i++){
                if(i === 0){
                    mostBid[i].isActive = true;
                }
                else {
                    mostBid[i].isActive = false;
                }

        }}
        res.render('home',{
            highestPrice,
            topExpire,
            mostBid,
            emptyHeight: highestPrice.length === 0,
            emptyMostBid: mostBid.length === 0,
            emptyExpire: topExpire.length === 0,
            title:"Home",
            style: "style.css"
        });
    }
        
})

router.post('/search',async (req,res)=>{
    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    const offset = (page-1)*limit;
    
    const total = await productModel.countSearchList(req.body.search);
    const rows = await productModel.searchList(req.body.search,offset);

    let nPage = Math.floor(total/limit);
    if(total%limit > 0) nPage++;

    const page_numbers = [];
    for(i=1;i<=nPage;i++){
        page_numbers.push({
            value: i,
            current: i=== +page,
        })
    };

    let page_prev = +page-1;
    if(page_prev < 1) page_prev = 1;

    let page_next = +page +1;
    if(page_next > nPage) page_next = nPage;

    res.render('productViews/listProduct',{
        products: rows,
        empty: rows.length === 0,
        page_numbers,
        page_prev,
        page_next,
        min: +page === 1,
        max: +page === nPage,
        title: 'Search List',
        style: 'style.css',
    })
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
    }),
    check('PhoneNo','Phone existed')
    .notEmpty()
    .isLength({min: 6}).withMessage('Phone number has at least 6 number')
    .custom(async value=>{
        return phone = await userModel.getIDByPhone(value).then(result=>{
            if(result.length>0){
                return Promise.reject('Phone existed');
            }
        })
    }),
    ],async (req,res)=>{

    var errors = validationResult(req).array();
    if(errors.length > 0){
        req.session.errors = errors;
        req.session.saveForm = req.body;
        res.redirect('/signUp');
    }else{
        console.log(req.body);
    const N = 10;
    const hash = bcryptjs.hashSync(req.body.pass_raw,N);
    const dob = moment(req.body.dob,'DD/MM/YYYY').format('YYYY-MM-DD');
    
    const entity = req.body;
    entity.Password = hash;
    entity.Point = 0;
    entity.DoB = dob;
    entity.Type = 0;
    console.log(entity);

    delete entity.dob;
    delete entity.pass_raw;
    delete entity.pass_rawC;
    delete entity.Sex;
    
    console.log(entity);
    const result = await userModel.register(entity);
    
    res.redirect('/login');
    }
    
})

router.get('/guess/:UserID',async (req,res)=>{
    const UserID = req.params.UserID;
    console.log(UserID);

    const rows = await userModel.guessProfile(UserID);
    const bidTime = await userModel.countBidID(UserID);
    const wonTime = await productModel.countWon(UserID);
    const feedback = await userModel.getFeedback(UserID);
    console.log(feedback);

    res.render('guessViews/Profile',{
        user: rows[0],
        bidTime,
        wonTime,
        feedback,
        title: 'Profile',
        style: 'style.css'
    })
})

router.get('/login',(req,res)=>{
    res.render('login',{
        layout: false,
        title:"Log In",
        style: "style.css"
    });
})

router.post('/login',async(req,res)=>{
    // g-recaptcha-response is the key that browser will generate upon form submit.
    // if its blank or null means user has not selected the captcha, so return the error.
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({ "responseCode": 1, "responseDesc": "Please select captcha" });
    }
    // Put your secret key here.
    var secretKey = "6LcJm8sUAAAAAAMeVu9_0crjuplytePx61d1vOcy";
    // req.connection.remoteAddress will provide IP address of connected user.
    var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;
    // Hitting GET request to the URL, Google will respond with success or error scenario.
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        // Success will be true or false depending upon captcha validation.
        if (body.success !== undefined && !body.success) {
            return res.json({ "responseCode": 1, "responseDesc": "Failed captcha verification" });
        }
    });

    const user = await userModel.singleByUsername(req.body.username);
    
    if(user === null){
        return res.render('login',{
            layout: false,
            title:"Log In",
            style: "style.css",
            err_message: 'No account exist'
        }); 
    }

    const authe = bcryptjs.compareSync(req.body.password, user.Password);
    
    const bidTime = await userModel.countBid(req.body.username);

    user.countBid = bidTime;

    if(authe === false){
        return res.render('login',{
            layout: false,
            title:"Log In",
            style: "style.css",
            err_message: 'Wrong password or wrong username'
        });
    }

    delete user.Password;
    req.session.isAuthenticated = true;
    req.session.isAuthenticatedAdmin = false;
    if(user.Type >= 1)
        req.session.isAuthenticatedSeller = true;
    else  req.session.isAuthenticatedSeller = false;
    req.session.authUser = user;

    const url = req.query.retUrl || '/';
    res.redirect('/');
    
})

router.get('/loginAdmin',(req,res)=>{
    res.render('login',{
        layout: false,
        title:"Log In",
        style: "style.css",
    });
})

router.post('/loginAdmin',async(req,res)=>{

    const user = await adminModel.singleByAdmin(req.body.username);
    
    if(user === null){
        return res.render('login',{
            layout: false,
            title:"Log In",
            style: "style.css",
            err_message: 'No account exist'
        }); 
    }

    const authe = bcryptjs.compareSync(req.body.password, user.Password);
    
    if(authe === false){
        return res.render('loginAdmin',{
            layout: false,
            title:"Log In",
            style: "style.css",
            err_message: 'Wrong password or wrong username'
        });
    }

    delete user.Password;

    req.session.isAuthenticated = true;
    req.session.isAuthenticatedAdmin = true;
    req.session.authUser = user;

    res.redirect('/admin');
    
})

router.post('/logout',(req,res)=>{
    req.session.isAuthenticated = false;
    req.session.isAuthenticatedAdmin=false;
    req.session.authUser = null;
    res.redirect('/');
    
});

router.get('/forgetPass',(req,res)=>{
    res.render('forgetPass',{
        title: 'Forget pass',
        style: "home.css"
    })
})

router.post('/forgetPass',async (req,res)=>{
    const check = await userModel.singleByEmail(req.body.Email);
    if(check === false)
        throw new Error('Invalid username or password');

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