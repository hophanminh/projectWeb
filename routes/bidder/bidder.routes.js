const express = require('express');
const nodemailer = require('nodemailer');
const productModel = require('../../models/product.model');
// const categoryModel = require('../../models/categories.model');
// const config = require('../../config/default.json');
// const moment = require('moment');

const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: 'sinsofhuman@gmail.com',
        pass: 'Phanminh195'
    }
});
const bidderMail = {
    from: 'sinsofhuman@gmail.com',
    to: 'phanminh1999@gmail.com',
    subject: 'Bid success',
    text: 'Bid success'
};
const sellerMail = {
    from: 'sinsofhuman@gmail.com',
    to: 'phanminh1999@gmail.com',
    subject: 'Bid success',
    text: 'some one bid success'
};

router.post('/:ItemId/:BidderID/bidProduct',async(req,res)=>{
    const id = req.params.ItemId;

    const product = await productModel.single(id);
    
    let entity;
    if(product[0].maxPrice < req.body.money){
        entity = req.params;
        entity.CurrentBidAmount = +product[0].maxPrice + 1;
        entity.maxPrice = req.body.money;
        transporter.sendMail(bidderMail,function(error,info){
            if(error)
                console.log(error);
            else console.log('Email sent: ' +info.respone);
        })
        transporter.sendMail(sellerMail,function(error,info){
            if(error)
                console.log(error);
            else console.log('Email sent: ' +info.respone);
        })
    }
    else {
        entity = req.params;
        delete entity.BidderID;
        if((+req.body.money +1) <= product[0].maxPrice)
            entity.CurrentBidAmount = +req.body.money + 1;
        else entity.CurrentBidAmount = +req.body.money;
    }
    
    const result = await productModel.bid(entity);

    entity.BidTime = new Date();
    entity.BidderID = req.params.BidderID;
    delete entity.maxPrice;
    const bidTime = await productModel.timeBid(entity);

    res.redirect(`/category`);

})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;
