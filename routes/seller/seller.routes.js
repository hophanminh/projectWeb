const express = require('express');
const moment = require('moment');
const multer = require('multer');
const fs = require('fs.extra');

const productModel = require('../../models/product.model');
const categoryModel = require('../../models/categories.model');
const userModal = require('../../models/user.model');
const config = require('../../config/default.json');

const router = express.Router();
const time = Date.now();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./public/img/` + time;
        fs.mkdirsSync(dir);
        return cb(null, dir);
    },
    filename: function (req, file, cb) {
            const files = req.files;
            let filename = file.originalname;
            let fileExtension = filename.split(".")[1];
            cb(null, Date.now() + "." + fileExtension);
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
        BidderID: null, //Auto
        AccountType: 'Mastercard',
        AccountNo: 'JEMO',
    }

    const result = await productModel.add(entity);
    res.redirect('/seller/addItem');
})

router.get('/sellList',async (req,res)=>{

    const SellerID = res.locals.authUser.UserID;

    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    const offset = (page-1)*limit;

    const total = await userModal.countSellList(SellerID);
    const rows = await userModal.sellList(SellerID,offset);

    let nPage = Math.floor(total/limit);
    if(total%limit > 0) nPage++;

    const page_numbers = [];
    for(i=1;i<=nPage;i++){
        page_numbers.push({
            value: i,
            current: i=== +page,
        })
    };

    let page_prev = +page-1;
    if(page_prev < 1) page_prev = 1;

    let page_next = +page +1;
    if(page_next > nPage) page_next = nPage;

    res.render('productViews/listProduct',{
        products: rows,
        empty: rows.length === 0,
        page_numbers,
        page_prev,
        page_next,
        min: +page === 1,
        max: +page === nPage,
        title: 'Sell list',
        style: 'style.css',
    })
})

router.get('/soldList',async(req,res)=>{

    const SellerID = res.locals.authUser.UserID;

    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    const offset = (page-1)*limit;

    const total = await userModal.countSoldList(SellerID);
    const rows = await userModal.soldList(SellerID,offset);

    let nPage = Math.floor(total/limit);
    if(total%limit > 0) nPage++;

    const page_number = [];
    for(i=1;i<=nPage;i++){
        page_number.push({
            value: i,
            current: i=== +page,
        })
    };

    let page_prev = +page-1;
    if(page_prev < 1) page_prev = 1;

    let page_next = +page +1;
    if(page_next > nPage) page_next = nPage;

    res.render('productViews/listProduct',{
        products: rows,
        empty: rows.length === 0,
        page_number,
        page_prev,
        page_next,
        min: +page === 1,
        max: +page === nPage,
        title: 'Sold list',
        style: 'style.css',
    })
})

router.post('/sellList/:ItemID/delete',async (req,res)=>{

    const entity = req.params;
    entity.SellerID = res.locals.authUser.UserID;

    console.log(entity);
    const result = await productModel.deleteItemSellList(entity);
    
    res.redirect(req.headers.referer);
})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;