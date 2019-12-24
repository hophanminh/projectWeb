const express = require('express');
const userModal = require('../../models/user.model');
const productModel = require('../../models/product.model');
const moment = require('moment');
const bcryptjs = require('bcryptjs');

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
    const rows = await productModel.all();
    console.log(rows),
    res.render('userViews/watchList',{
        products: rows,
        empty: rows.length === 0,
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