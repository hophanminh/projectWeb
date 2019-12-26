const express = require('express');
const config = require('../../config/default.json');
const categoryModal = require('../../models/categories.model');

const router = express.Router();

router.get('/',async(req,res)=>{
    res.render('productViews/listProduct',{
        title: 'List product',
        style: 'style.css'
    })
})

router.get('/:CatID/product',async(req,res)=>{
    // const rows = await productModel.all();

    for(const c of res.locals.lcCategory){
        if(c.CatID === +req.params.CatID){
            c.isActive = true;
        }
    }

    console.log(res.locals.lcCategory);

    const CatID = req.params.CatID;
    console.log(CatID);
    const limit = config.paginate.limit;
    const page = req.query.page || 1;
    if(page<1) page = 1;
    const offset = (page-1)*limit;

    const [total,rows] = await Promise.all([
        categoryModal.countAllByCat(CatID),
        categoryModal.pageAllByCat(CatID,offset)
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

router.get('/err', (req, res) => {

    throw new Error('error occured');
})

module.exports = router;
