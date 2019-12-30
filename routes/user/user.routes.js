const express = require('express');
const moment = require('moment');
const bcryptjs = require('bcryptjs');
const userModal = require('../../models/user.model');
const productModel = require('../../models/product.model');
const config = require('../../config/default.json');

const router = express.Router();

router.get('/',async(req,res)=>{
    const rows = await productModel.all();
    console.log(rows),
    res.render('userViews/bidderProfile',{
        products: rows,
        empty: rows.length === 0,
        title: 'Profile',
        style: 'style.css',
        js: 'product.js'
    })
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

    res.render('userViews/watchList',{
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

router.post('/changePass/:UserID',async(req,res)=>{

    const N = 10;
    const hash = bcryptjs.hashSync(req.body.password_raw,N);

    const entity = req.body;

    entity.Password = hash;
    entity.UserID = req.params.UserID;

    delete entity.password_raw;

    console.log(entity);
    const result = await userModal.changePass(entity);
})
router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;