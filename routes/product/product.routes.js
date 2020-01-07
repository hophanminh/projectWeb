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
    const CatID = await productModel.getCatByID(id);
    const relativeProducts = await productModel.relativeProducts(CatID[0].CatID);
    const date = new Date(product[0].AuctionEnd);
    const timeleft = moment(date - Date.now()).format('HH:mm:ss');

    if(relativeProducts.length!=0){
        for(i = 0 ;i < relativeProducts.length;i++){
            if(i === 0){
                relativeProducts[i].isActive = true;
            }
            else {
                relativeProducts[i].isActive = false;
            }

    }}

    for(i=0;i<history.length;i++){
        const time = moment(history[i].BidTime).format('LLL');
        delete history[i].BidTime;

        history[i].time = time;
    }
    console.log(relativeProducts);
    res.render('productViews/product',{
        product: product[0],
        bid,
        history,
        timeleft,
        relativeProducts,
        emptyRelativeProducts: relativeProducts.length === 0,
        empty: product.length === 0,
        title: 'Product',
        style: 'style.css',
    })
})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;