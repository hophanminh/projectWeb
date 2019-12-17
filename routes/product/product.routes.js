const express = require('express');
const productModel = require('../../models/product.model');
const categoryModel = require('../../models/categories.model');
const config = require('../../config/default.json');
const moment = require('moment');

const router = express.Router();

router.get('/',async (req,res)=>{
    // const rows = await productModel.all();
    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    if(page<1) page = 1;
    const offset = (page-1)*limit;

    const [total,rows] = await Promise.all([
        productModel.countAll(),
        productModel.pageAll(offset)
    ])

    let nPage = Math.floor(total/limit);
    if (total%limit > 0) nPage++;

    const page_numbers = [];
    for(i=1;i<=nPage;i++){
        page_numbers.push({
            value: i,
            current: i === +page
        })
    };

    let page_prev = +page -1;
    if(page_prev < 1) page_prev=1;

    let page_next = +page + 1;
    if(page_next > nPage) page_next = nPage;

    console.log(rows);
    res.render('productViews/listProduct',{
        products: rows,
        empty: rows.length === 0,
        page_numbers,
        page_prev,
        min: +page === 1,
        page_next,
        max: +page === nPage,
        title: 'List Product',
        style: 'style.css',
        js: 'product.js'
    })
})

router.get('/addItem',async(req,res)=>{

    const category = await categoryModel.allCategory();

    console.log(category);

    res.render('productViews/addItem',{
        category,
        title: 'Add Item',
        style: 'style.css'
    })
})

router.post('/addItem',async (req,res)=>{
    let startDate= moment().format('YYYY-MM-DD h:mm:ss');
    let endDate = moment().add(config.DateLast.LastDate,'days').calendar();

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
        SellerID: 3, // auto
        ShipPrice: 10,
        BidderID: 3, //Auto
        AccountType: 'Mastercard',
        AccountNo: 'JEMO',
    }
    console.log(entity);

    const result = await productModel.add(entity);
    console.log(result);
    res.render('productViews/addItem',{
        title: 'Add Item',
        style: 'style.css',
        js: 'addCategory.js'
    })
})

router.get('/:ItemId',async (req,res)=>{
    console.log(req.params);
    const product = await productModel.single(req.params.ItemId);
    console.log(product);
    start = moment(product[0].AuctionStart).format('LL');
    product[0].AuctionStart = start;
    console.log(product);

    res.render('productViews/product',{
        product: product[0],
        empty: product.length ===0,
        title: 'Product',
        style: 'style.css',
        js: 'product.js'
    })
})


router.post('/:ItemId/bidProduct',async(req,res)=>{
    console.log(req.params);
    console.log(req.body);

    const entity = req.params;
    entity.CurrentBidAmount = req.body.money;
    console.log(entity);

    const result = await productModel.bid(entity);
    res.redirect(`/product`);
})


router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;