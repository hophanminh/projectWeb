const express = require('express');
const productModel = require('../../models/product.model');
const categoryModel = require('../../models/categories.model');
const config = require('../../config/default.json');
const moment = require('moment');

const router = express.Router();

router.get('/:ItemId',async (req,res)=>{
    const id = req.params.ItemId;

    const product = await productModel.single(id);
    const bid = await productModel.countBid(id);
    const history = await productModel.bidHistory(id);

    start = moment(product[0].AuctionStart).format('LL');
    product[0].AuctionStart = start;

    for(i=0;i<history.length;i++){
        const time = moment(history[i].BidTime,'YYYY-MM-DD').format('LL');
        delete history[i].BidTime;

        history[i].time = time;
    }

    console.log(history);
    
    res.render('productViews/product',{
        product: product[0],
        bid,
        history,
        empty: product.length === 0,
        title: 'Product',
        style: 'style.css',
    })
})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;