const express = require('express');
const moment = require('moment');
const multer = require('multer');
const fs = require('fs.extra');

const productModel = require('../../models/product.model');
const categoryModel = require('../../models/categories.model');
const config = require('../../config/default.json');

const router = express.Router();
const time = Date.now();

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
            let filename = file.originalname;
            let fileExtension = filename.split(".")[1];
            cb(null, Date.now() + "." + fileExtension);
    },
    destination: function (req, file, cb) {
        const dir = `./public/img/` + time;
        fs.mkdirsSync(dir);
        return cb(null, dir);
    },
});
const upload = multer({ storage });

router.get('/addItem', async (req, res) => {

    const category = await categoryModel.allCategory();

    console.log(category);

    res.render('productViews/addItem', {
        category,
        title: 'Add Item',
        style: 'style.css'
    })
})

// router.post('/addItem/:UserID',upload.single('img'),async (req,res)=>{    
router.post('/addItem/:UserID',upload.array('img',6), async (req, res) => {
    let startDate = new Date();
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const endDate = (startDate.addDays(config.DateLast.LastDate));

    const entity = {
        Title: req.body.Title,
        TinyDes: req.body.TinyDes,
        FullDes: req.body.FullDes,
        Condition: req.body.Condition,
        CatID: req.body.Category,
        MinPoint: req.body.MinPoint,
        StartBidAmount: req.body.StartBidAmount,
        CurrentBidAmount: req.body.StartBidAmount,
        AuctionStart: startDate, // Auto: Done
        AuctionEnd: moment(endDate).format('YYYY-MM-DD h:mm:ss'), // Auto: Done
        SellerID: req.params.UserID, // auto
        ShipPrice: 10,
        BidderID: 3, //Auto
        AccountType: 'Mastercard',
        AccountNo: 'JEMO',
    }

    const result = await productModel.add(entity);
    res.redirect('/seller/addItem');
})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;