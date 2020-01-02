const express = require('express');
const moment = require('moment');
const bcryptjs = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const userModal = require('../../models/user.model');
const productModel = require('../../models/product.model');
const config = require('../../config/default.json');

const router = express.Router();

router.get('/',async(req,res)=>{
    const rows = await userModal.getIDByUsername(res.locals.authUser.Username);
    const feedback = await userModal.getFeedback(res.locals.authUser.UserID);

    console.log(rows);

    const dob = moment(rows[0].DoB,'YYYY-MM-DD').format('DD/MM/YYYY');
    rows[0].dob = dob;

    res.render('userViews/Profile',{
        user: rows[0],
        feedback,
        empty: rows.length === 0,
        title: 'Profile',
        style: 'style.css',
        js: 'product.js',
    })
})

router.get('/:UserID/edit',async(req,res)=>{

    const rows = await userModal.getIDByUsername(res.locals.authUser.Username);

    console.log(rows);

    const dob = moment(rows[0].DoB,'YYYY-MM-DD').format('DD/MM/YYYY');
    rows[0].dob = dob;

    res.render('userViews/editProfile',{
        user: rows[0],
        empty: rows.length === 0,
        title: 'Profile',
        style: 'style.css',
        js: 'product.js',
    })
})

router.post('/:UserID/edit',[
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
    ],async(req,res)=>{

    var errors = validationResult(req).array();

    if(errors.length > 0){
        req.session.errors = errors;
        res.redirect('/user');
    }

    const dob = moment(req.body.dob,'DD/MM/YYYY').format('YYYY-MM-DD');
    
    const entity = req.body;
    entity.DoB = dob;
    entity.UserID = req.params.UserID;
    console.log(entity);

    delete entity.dob;
    
    console.log('profile edit');
    console.log(entity);
    const result = await userModal.modifyProfile(entity);
    
    res.redirect('/');
})

router.get('/watchList',async(req,res)=>{

    const UserID = res.locals.authUser.UserID;

    
    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    const offset = (page-1)*limit;
    
    const total = await productModel.countWatchList(UserID);
    const rows = await productModel.watchList(UserID,offset);

    console.log(rows);
    console.log(total);

    // const [total, rows] = await Promise.all([
    //     productModel.countWatchList(UserID),
    //     productModel.watchList(UserID),
    // ]);

    let nPage = Math.floor(total/limit);
    if(total%limit > 0) nPage++;

    const page_number = [];
    for(i=1;i<=nPage;i++){
        page_number.push({
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
        page_number,
        page_prev,
        page_next,
        min: +page ===1,
        max: +page === nPage,
        title: 'Watch list',
        style: 'style.css',
        js: 'product.js'
    })
})

router.get('/changePass',(req,res)=>{
    res.render('userViews/changePassword',{
        title: 'Change Password',
        style: 'home.css',
        js: 'home.js'
    })
})

router.post('/watchList/:ItemID',async (req,res)=>{
    console.log('ID: ');
    console.log(req.params.ItemID);
    console.log(res.locals.authUser.UserID);

    let entity = req.params;
    entity.UserID = res.locals.authUser.UserID;
    console.log(entity);

    const result = await productModel.addItemWatchList(entity);
    console.log(result);
    res.redirect(req.headers.referer);
})

router.post('/watchList/:ItemID/delete',async (req,res)=>{
    console.log('ID: ');
    console.log(req.params.ItemID);
    console.log(res.locals.authUser.UserID);

    let entity = req.params;
    entity.UserID = res.locals.authUser.UserID;
    console.log(entity);

    const result = await productModel.deleteItemWatchList(entity);
    console.log(result);
    res.redirect(req.headers.referer);
})

router.post('/changePass/:UserID',async(req,res)=>{

    const N = 10;
    const hash = bcryptjs.hashSync(req.body.password_raw,N);

    const entity = req.body;

    entity.Password = hash;
    entity.UserID = req.params.UserID;

    delete entity.password_raw;

    console.log(entity);
    const result = await userModal.changePass(entity);
    res.redirect('/login');
})

router.get('/bidding',async(req,res)=>{

    
    const UserID = res.locals.authUser.UserID;

    
    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    const offset = (page-1)*limit;
    
    const total = await productModel.countBidding(UserID);
    const rows = await productModel.biddingList(UserID,offset);

    console.log(rows);
    console.log(total);

    for(i=0;i<rows.length;i++){
        if(rows[i].BidderID == UserID)
            rows[i].holdPrice = true;
        else rows[i].holdPrice = false;
    }

    // const [total, rows] = await Promise.all([
    //     productModel.countWatchList(UserID),
    //     productModel.watchList(UserID),
    // ]);

    console.log('here');
    console.log(rows);

    let nPage = Math.floor(total/limit);
    if(total%limit > 0) nPage++;

    const page_number = [];
    for(i=1;i<=nPage;i++){
        page_number.push({
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
        page_number,
        page_prev,
        page_next,
        min: +page ===1,
        max: +page === nPage,
        title: 'Bidding',
        style: 'style.css',
    })
})

router.get('/wonList',async(req,res)=>{

    
    const UserID = res.locals.authUser.UserID;

    
    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    const offset = (page-1)*limit;
    
    const total = await productModel.countWon(UserID);
    const rows = await productModel.wonList(UserID,offset);

    console.log(rows);
    console.log(total);

    // const [total, rows] = await Promise.all([
    //     productModel.countWatchList(UserID),
    //     productModel.watchList(UserID),
    // ]);

    let nPage = Math.floor(total/limit);
    if(total%limit > 0) nPage++;

    const page_number = [];
    for(i=1;i<=nPage;i++){
        page_number.push({
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
        page_number,
        page_prev,
        page_next,
        min: +page ===1,
        max: +page === nPage,
        title: 'Bidding',
        style: 'style.css',
    })
})

router.get('/:UserID/review/:id',async(req,res)=>{
    const UserID = req.params.id;
    const User = await userModal.singleByID(UserID);

    res.render('userViews/feedback',{
        user: User[0],
        title: 'Feed back',
        style: 'style.css',
    })
})

router.post('/:UserID/review/:id',async(req,res)=>{
   const entity = req.body;
    console.log(entity);
    const date = Date.now();
    entity.Date = moment(date).format('YYYY-MM-DD');
    const result = await userModal.addFeedBack(entity);
    console.log(result);
    res.redirect('/');
})

router.post('/sellerRequired/:UserID',async(req,res)=>{
    const result =await userModal.sellerRequired(req.params.UserID);
    res.redirect('/user');
})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})


module.exports = router;