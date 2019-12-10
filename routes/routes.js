const express = require('express');
const productModel = require('../models/product.model');

const router = express.Router();

router.get('/',(req,res)=>{
    res.render('homeGuess',{
        title:"Home",
        style: "style.css"
    });
})

router.get('/FAQ',(req,res)=>{
    res.render('FAQ',{
        title:"FAQ",
        style: "style.css"
    });
})

router.get('/login',(req,res)=>{
    res.render('login',{
        title:"Log In",
        style: "style.css"
    });
})

router.get('/signUp',(req,res)=>{
    res.render('signUp',{
        title: 'Sign Up',
        style: 'style.css'
    })
})

router.get('/contact',(req,res)=>{
    res.render('contact',{
        title: 'contact',
        style: 'style.css'
    })
})

router.get('/listProduct',async (req,res)=>{
    const rows = await productModel.all();
    console.log(rows),
    res.render('listProduct',{
        products: rows,
        empty: rows.length === 0,
        title: 'List Product',
        style: 'style.css',
        js: 'product.js'
    })
})

router.get('/product/:id',async (req,res)=>{
    const rows = await productModel.single(res.param.id);
    console.log(rows);
    res.render('listProduct',{
        products: rows,
        empty: rows.length ===0,
        title: 'List Product',
        style: 'style.css',
        js: 'product.js'
    })
})

router.get('/error',(req,res)=>{
    res.render('error',{
        title: 'Error',
        style: 'style.css'
    })
})


module.exports = router;