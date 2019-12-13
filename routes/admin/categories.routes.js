const express = require('express');
const time = require('moment');
// const adminModel = require('../../models/admin.model');
const categoryModal = require('../../models/categories.model');

const router = express.Router();

router.get('/addItem',(req,res)=>{
    res.render('adminViews/addItem',{
        title: 'Add categories',
        style: 'style.css'
    })
})

router.post('/addCategories',async (req,res)=>{
    var startDate= new Date();
    var endDate = startDate;
    const entity = {
        Title: req.body.Title,
        TinyDes: req.body.TinyDes,
        FullDes: req.body.FullDes,
        Condition: req.body.Condition,
        Category: req.body.Category,
        StartBidAmount: req.body.StartBidAmount,
        AuctionStart: startDate, // Auto: Done
        AuctionEnd: endDate, // Auto: Done
        SellerID: 3, // auto
        ShipPrice: 10,
        BidderID: 3, //Auto
        AccountType: 'Mastercard',
        AccountNo: 'JEMO',
        Lowestprice: req.body.LowestPrice,
    }
    console.log(entity);

    const result = await categoryModal.add(entity);
    //console.log(result);
    res.render('adminViews/addItem',{
        title: 'Add categories',
        style: 'style.css',
        js: 'addCategory.js'
    })
})


router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;
