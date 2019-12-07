const express = require('express');
// const adminModel = require('../../models/admin.model');
const categoryModal = require('../../models/categories.model');

const router = express.Router();


router.get('/addCategories',(req,res)=>{
    res.render('adminViews/addCategories',{
        title: 'Add categories',
        style: 'style.css'
    })
})

router.post('/addCategories',async (req,res)=>{
    const entity ={
        ItemID: 99,
        Title: req.body.Username,
        TinyDes: '123',
        FullDes: '1',
        Condition: 'Fair',
        Category: 'Beverages',
        StartBidAmount: 40,
        AuctionStart: '1963-11-06 16:15:07.900',
        AuctionEnd: '1998-04-29 17:44:41.850',
        SellerID: 3,
        ShipPrice: 10,
        BidderID: 3,
        AccountType: 'Mastercard',
        AccountNo: 'JEMO',
        Lowestprice: '10'
    }
    console.log(entity);

    const result = await categoryModal.add(entity);
    //console.log(result);
    res.render('adminViews/addCategories',{
        title: 'Add categories',
        style: 'style.css'
    })
})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;
