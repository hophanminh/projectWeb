const express = require('express');
const adminModel = require('../../models/admin.model');
const categoryModel = require('../../models/categories.model');
const moment = require('moment');

const router = express.Router();

router.get('/', async(req,res)=>{
    const rowsSeller = await adminModel.allSeller();
    const rowsBidder = await adminModel.allBidder();
    let rowsCategory = await categoryModel.allCategory();

    for(i = 0; i< rowsCategory.length;i++)
    {
        if(rowsCategory[i].total === 0)
            rowsCategory[i].del = true;
        else rowsCategory[i].del = false;
    }

    console.log(rowsCategory);

    res.render('adminViews/Management',{
        seller: rowsSeller,
        bidder: rowsBidder,
        category: rowsCategory,

        emptySeller: rowsSeller.length === 0,
        emptyBidder: rowsBidder.length === 0,
        emptyCategory: rowsCategory.length === 0,

        title: 'Management',
        style: 'style.css'
    })
})

router.get('/seller/:id',async(req,res)=>{
    
    const rowsSeller = await adminModel.sellerDetail(req.params.id);
    const dob = moment(rowsSeller[0].DoB).format('LL');

    rowsSeller[0].DoB = dob;

    res.render('adminViews/sellerDetail',{
        seller: rowsSeller[0],
        empty: rowsSeller.length === 0,
        title: 'Seller',
        style: 'style.css'
    })
})

router.post('/deleteSeller',async(req,res)=>{
    
    console.log(req.body);

    const result = await adminModel.deleteSeller(req.body.UserID);
    console.log(result);
    res.redirect('/admin');
})

router.post('/modifySeller',async (req,res)=>{
    const entity = req.body;
    
    const dob = moment(entity.dob_raw,'LL').format('YYYY-MM-DD');
    
    entity.DoB = dob;
    delete entity.dob_raw;
    delete entity.nPS;
    
    console.log(entity);

    const result = await adminModel.modifySeller(entity);
    res.redirect('/admin');
})


router.get('/sellerDetail/:id',async(req,res)=>{
    const rows = await adminModel.sellerDetail(req.params.id);
    console.log(rows);
    res.render('adminViews/sellerDetail',{
        seller: rows,
        title: 'Seller Detail',
        style: 'management.css',
        empty: rows.length === 0,
        seller: rows[0]

    })
})


// Add admin mai mot lam
// router.get('/addAdmin',(req,res)=>{
//     res.render('adminViews/addCategories',{
//         title: 'Add categories',
//         style: 'style.css'
//     })
// })

router.get('/addCategory',(req,res)=>{
    res.render('adminViews/addCategory',{
        title: 'Add Category',
        style: 'style.css',
    })
})

router.post('/addCategory',async (req,res)=>{
    
    console.log(req.body);

    const result = await categoryModel.add(req.body);
    
    console.log(result);
    
    res.redirect('/admin');
})

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;