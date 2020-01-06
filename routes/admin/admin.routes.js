const express = require('express');
const moment = require('moment');
const bcryptjs = require('bcryptjs');
const adminModel = require('../../models/admin.model');
const categoryModel = require('../../models/categories.model');
const userModel = require('../../models/product.model');
const router = express.Router();

router.get('/', async(req,res)=>{
    const [rowsSeller, rowsBidder, requestSeller, rowsCategory, numSeller, numBidder,numCategory, numRequest] = await Promise.all([
            adminModel.allSeller(),
            adminModel.allBidder(),
            adminModel.requestSeller(),
            categoryModel.allCategory(),
            adminModel.countSeller(),
            adminModel.countBidder(),
            categoryModel.countCategory(),
            adminModel.countRequest(),   
        ]
    )

    for(i = 0; i< rowsCategory.length;i++)
    {
        if(rowsCategory[i].Total === 0)
            rowsCategory[i].isDel = true;
        else rowsCategory[i].isDel = false;
    }

    res.render('adminViews/Management',{
        layout: 'adminLayout.hbs',
        seller: rowsSeller,
        requestSeller,
        bidder: rowsBidder,
        category: rowsCategory,

        nBidder: numBidder[0],
        nSeller: numSeller[0],
        nCategory: numCategory[0],
        nRequest: numRequest[0],

        emptySeller: rowsSeller.length === 0,
        emptyBidder: rowsBidder.length === 0,
        emptyCategory: rowsCategory.length === 0,
        emptyRequest: requestSeller.length===0,
        title: 'Management',
        style: 'style.css'
    })
})

router.get('/seller/:id',async(req,res)=>{
    
    const rowsSeller = await adminModel.sellerDetail(req.params.id);
    const dob = moment(rowsSeller[0].DoB).format('LL');

    rowsSeller[0].DoB = dob;

    res.render('adminViews/sellerDetail',{
        layout: 'adminLayout.hbs',
        seller: rowsSeller[0],
        empty: rowsSeller.length === 0,
        title: 'Seller',
        style: 'style.css'
    })
})

router.post('/deleteSeller',async(req,res)=>{
    
    const result = await adminModel.deleteSeller(req.body.UserID);
    res.redirect('/admin');
})

router.post('/modifySeller',async (req,res)=>{
    const entity = req.body;
    
    const dob = moment(entity.dob_raw,'LL').format('YYYY-MM-DD');
    
    entity.DoB = dob;
    delete entity.dob_raw;
    delete entity.nPS;
    
    const result = await adminModel.modifySeller(entity);
    res.redirect('/admin');
})

router.get('/sellerDetail/:id',async(req,res)=>{
    const rows = await adminModel.sellerDetail(req.params.id);
    
    res.render('adminViews/sellerDetail',{
        layout: 'adminLayout.hbs',
        seller: rows,
        title: 'Seller Detail',
        style: 'management.css',
        empty: rows.length === 0,
        seller: rows[0]

    })
})

router.get('/addAdmin',(req,res)=>{
    res.render('adminViews/addAdmin',{
        layout: 'adminLayout.hbs',
        title: 'Add Admin',
        style: 'style.css'
    })
})

router.post('/addAdmin',async(req,res)=>{
    const N = 10;
    const hash = bcryptjs.hashSync(req.body.pass_raw,N);

    const entity = req.body;
    entity.Password = hash;
    
    delete entity.pass_rawC;
    delete entity.pass_raw;

    const result = await adminModel.addAdmin(entity);
    res.redirect('/');
})

router.get('/addCategory',(req,res)=>{
    res.render('adminViews/addCategory',{
        layout: 'adminLayout.hbs',
        title: 'Add Category',
        style: 'style.css',
    })
})

router.post('/addCategory',async (req,res)=>{  
    const result = await categoryModel.add(req.body);
        
    res.redirect('/admin');
})

router.post('/deleteCategory/:CatId',async(req,res)=>{
    const result = await categoryModel.deleteCategory(req.params);
    res.redirect('/admin');
})

router.post('/aprove/:UserID',async(req,res)=>{
    const result = await adminModel.aproveBidder(req.params.UserID);
    res.redirect('/admin');
})

router.post('/reject/:UserID',async(req,res)=>{
    const result = await adminModel.rejectBidder(req.params.UserID);
    res.redirect('/admin');
})

router.get('/category/:CatID',async(req,res)=>{
    const rows = await categoryModel.singleCategory(req.params.CatID);

    res.render('adminViews/categoryDetail',{
        layout: 'adminLayout.hbs',
        category: rows[0],
        title: 'Category Detail',
        style: 'style.css'
    });
})

router.post('/category/:CatID',async(req,res)=>{

    const entity = req.body;
    entity.CatID = req.params.CatID;
    const rows = await categoryModel.changeCategoryName(entity);

    res.redirect('/admin');
})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;