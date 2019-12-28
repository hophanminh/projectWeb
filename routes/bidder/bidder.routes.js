const express = require('express');
const productModel = require('../../models/product.model');
// const categoryModel = require('../../models/categories.model');
// const config = require('../../config/default.json');
// const moment = require('moment');

const router = express.Router();

router.post('/:ItemId/:BidderID/bidProduct',async(req,res)=>{
    console.log(req.body);
    const entity = req.params;
    entity.CurrentBidAmount = req.body.money;

    const result = await productModel.bid(entity);

    entity.BidTime = new Date();
    console.log(entity);
    const bidTime = await productModel.timeBid(entity);

    res.redirect(`/category`);

})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;
