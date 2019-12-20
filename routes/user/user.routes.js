const express = require('express');
const userModal = require('../../models/user.model');
const productModel = require('../../models/product.model');
const moment = require('moment');

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

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;