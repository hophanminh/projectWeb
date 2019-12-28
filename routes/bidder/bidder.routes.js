const express = require('express');
const productModel = require('../../models/product.model');
// const categoryModel = require('../../models/categories.model');
// const config = require('../../config/default.json');
// const moment = require('moment');

const router = express.Router();

router.post('/:ItemId/:BidderID/bidProduct',async(req,res)=>{
    console.log(req.body);
    console.log(req.params.ItemId);
    const id = req.params.ItemId;

    const product = await productModel.single(id);
    
    let entity;
    if(product[0].maxPrice < req.body.money){
        entity = req.params;
        entity.CurrentBidAmount = +product[0].maxPrice + 1;
        entity.maxPrice = req.body.money;
    }
    else {
        entity = req.params;
        console.log(entity);
        delete entity.BidderID;
        entity.CurrentBidAmount = +req.body.money + 1;
    }
    
    const result = await productModel.bid(entity);

    entity.BidTime = new Date();

    delete entity.maxPrice;
    const bidTime = await productModel.timeBid(entity);

    res.redirect(`/category`);

})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;
